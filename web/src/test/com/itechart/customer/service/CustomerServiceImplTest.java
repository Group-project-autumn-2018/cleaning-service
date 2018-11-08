package com.itechart.customer.service;

import com.itechart.common.service.EmailService;
import com.itechart.common.service.RoleService;
import com.itechart.common.service.SMSService;
import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.customer.repository.CustomerRepository;
import com.itechart.customer.util.CustomerVerification;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.charset.Charset;
import java.time.LocalTime;
import java.util.Base64;
import java.util.Optional;
import java.util.concurrent.ConcurrentMap;

import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class CustomerServiceImplTest {
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @InjectMocks
    private CustomerServiceImpl customerService;

    @Mock
    private CustomerRepository repository;

    @Mock
    private RoleService roleService;

    @Mock
    private EmailService emailService;

    @Mock
    private SMSService smsService;
    private ConcurrentMap<String, CustomerVerification> verifications;
    private CustomerRegistrationDto registrationDto = new CustomerRegistrationDto();
    private VerifyDto verifyDto = new VerifyDto();
    private String encodedToken;

    @Before
    public void setup() {
        initMocks(this);
        verifications = (ConcurrentMap<String, CustomerVerification>)
                ReflectionTestUtils.getField(customerService, "verifications");
        registrationDto.setEmail("lysianok_artem@mail.ru");
        registrationDto.setPassword("12345678");
        registrationDto.setUsername("Eitarg");
        byte[] token = (registrationDto.getUsername() + registrationDto.getPassword())
                .getBytes(Charset.forName("UTF-8"));
        encodedToken = Base64.getEncoder().encodeToString(token);
        verifyDto.setEncodedString(encodedToken);
    }

    @Test
    public void testPreRegistration() {
        customerService.registerCustomer(registrationDto);
        CustomerVerification verification = verifications.get(encodedToken);
        Assert.assertNotNull(verification);
        Assert.assertEquals(0, verification.getTryCount());
        Assert.assertTrue(verification.getCode() > 99_999 && verification.getCode() < 1_000_000);
    }

    @Test
    public void testVerify() {
        Optional<Boolean> result;
        customerService.registerCustomer(registrationDto);
        CustomerVerification verification = verifications.get(encodedToken);

        verifyDto.setCode(0);
        result = customerService.verify(verifyDto);
        Assert.assertEquals(1, verification.getTryCount());
        Assert.assertEquals(result, Optional.of(false));

        verifyDto.setCode(null);
        result = customerService.verify(verifyDto);
        Assert.assertEquals(1, verification.getTryCount());
        Assert.assertEquals(result, Optional.empty());

        verifyDto.setCode(Integer.MAX_VALUE);
        result = customerService.verify(verifyDto);
        Assert.assertEquals(result, Optional.of(false));
        Assert.assertEquals(2, verification.getTryCount());

        verifyDto.setCode(verification.getCode());
        result = customerService.verify(verifyDto);
        Assert.assertEquals(result, Optional.of(true));
        Assert.assertNull(verifications.get(encodedToken));

        customerService.registerCustomer(registrationDto);
        for (int i = 0; i < 5; i++) {
            verifyDto.setCode(i);
            customerService.verify(verifyDto);
        }
        customerService.verify(verifyDto);
        Assert.assertNull(verifications.get(encodedToken));
    }

    @Test
    public void testClearOldVerifications() {
        customerService.registerCustomer(registrationDto);
        CustomerVerification verification = verifications.get(encodedToken);

        verification.setAddingTime(LocalTime.now().minusMinutes(15));
        customerService.clearOldVerifications();
        Assert.assertNotNull(verifications.get(encodedToken));

        verification.setAddingTime(LocalTime.now().minusMinutes(30));
        customerService.clearOldVerifications();
        Assert.assertNull(verifications.get(encodedToken));
    }
}
