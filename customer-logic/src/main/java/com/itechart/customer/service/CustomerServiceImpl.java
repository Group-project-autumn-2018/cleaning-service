package com.itechart.customer.service;

import com.itechart.common.entity.Role;
import com.itechart.common.service.EmailService;
import com.itechart.common.service.RoleService;
import com.itechart.common.service.SMSService;
import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.customer.entity.Customer;
import com.itechart.customer.repository.CustomerRepository;
import com.itechart.customer.util.CustomerVerification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.nio.charset.Charset;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private ConcurrentMap<String, CustomerVerification> verifications = new ConcurrentHashMap<>();
    private final EmailService emailService;
    private final RoleService roleService;
    private final SMSService smsService;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository,
                               BCryptPasswordEncoder bCryptPasswordEncoder,
                               EmailService emailService, RoleService roleService,
                               SMSService smsService) {
        this.customerRepository = customerRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailService = emailService;
        this.roleService = roleService;
        this.smsService = smsService;
    }

    @Override
    public Page<Customer> findPaginated(int page, int size) {
        return customerRepository.findAll(PageRequest.of(page, size, Sort.by("username", "id")));
    }

    @Override
    public void update(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    private Long saveCustomer(CustomerRegistrationDto registrationDto) {
        Customer customer = new Customer();
        customer.setUsername(registrationDto.getUsername());
        customer.setConfirmed(false);
        customer.setEmail(registrationDto.getEmail());
        customer.setPhone(registrationDto.getPhone());
        Role customerRole = roleService.getRole("customer");
        customer.setRoles(Collections.singletonList(customerRole));
        customer.setPassword(bCryptPasswordEncoder.encode(registrationDto.getPassword()));
        customer.setAddingDate(LocalDate.now());
        customerRepository.saveAndFlush(customer);
        return customer.getId();
    }

    @Override
    public void registerCustomer(CustomerRegistrationDto registrationDto) {
        Long customerId = saveCustomer(registrationDto);
        CustomerVerification verification = new CustomerVerification();
        verification.setCustomerId(customerId);
        verification.setAddingTime(LocalTime.now());
        verification.setTryCount(0);
        byte[] token = (registrationDto.getUsername() + registrationDto.getPassword())
                .getBytes(Charset.forName("UTF-8"));
        String encodedToken = Base64.getEncoder().encodeToString(token);
        int randomCode = (int) (Math.random() * 1_000_000);
        verification.setCode(randomCode);
        verifications.put(encodedToken, verification);
        String text = "Your verification code: " + randomCode;
        if (registrationDto.getEmail() != null && registrationDto.getEmail().length() > 0) {
            String subject = "Account activation " + LocalDate.now().toString();
            emailService.sendSimpleMessage(registrationDto.getEmail(), subject, text);
        } else if (registrationDto.getPhone() != null && registrationDto.getPhone().length() > 4) {
            smsService.sendSMS(registrationDto.getPhone(), text);
        }
    }

    @Override
    @Transactional
    public Optional<Boolean> verify(VerifyDto verifyDto) {
        if (verifyDto.getCode() == null || verifyDto.getEncodedString() == null) return Optional.empty();
        String encodedString = verifyDto.getEncodedString();
        int code = verifyDto.getCode();
        CustomerVerification verification = verifications.get(encodedString);
        if (verification == null) return Optional.empty();
        if (verification.getTryCount() >= 5) {
            verifications.remove(encodedString);
            return Optional.empty();
        }
        if (verification.getCode() == code) {
            customerRepository.changeConfirmStatus(true, verification.getCustomerId());
            verifications.remove(encodedString);
            return Optional.of(true);
        } else {
            verification.setTryCount(verification.getTryCount() + 1);
            return Optional.of(false);
        }
    }

    @Scheduled(fixedDelay = 1_800_000)
    public void clearOldVerifications() {
        for (Map.Entry<String, CustomerVerification> entry : verifications.entrySet()) {
            long difference = LocalTime.now().toSecondOfDay() - entry.getValue().getAddingTime().toSecondOfDay();
            if (difference > 1200 || difference < -1200) {
                verifications.remove(entry.getKey());
            }
        }
    }
}
