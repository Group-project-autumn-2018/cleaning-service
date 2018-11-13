package com.itechart.service.service.impl;

import com.itechart.common.entity.Role;
import com.itechart.common.service.EmailService;
import com.itechart.common.service.RoleService;
import com.itechart.common.service.SMSService;
import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.customer.entity.Customer;
import com.itechart.customer.util.CustomerVerification;
import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.repository.CleaningCompanyRepository;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.CleaningTimeService;
import com.itechart.service.service.PriceService;
import com.itechart.service.util.ServiceVerification;
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
import java.util.Base64;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class CleaningCompanyServiceImpl implements CleaningCompanyService {

    private final CleaningCompanyRepository cleaningCompanyRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private ConcurrentMap<String, ServiceVerification> verifications = new ConcurrentHashMap<>();;
    private final EmailService emailService;
    private final RoleService roleService;
    private final SMSService smsService;
    private final PriceService priceService;
    private final CleaningTimeService cleaningTimeService;

    @Autowired
    public CleaningCompanyServiceImpl(CleaningCompanyRepository cleaningCompanyRepository,
                                      BCryptPasswordEncoder bCryptPasswordEncoder,
                                      EmailService emailService, RoleService roleService,
                                      SMSService smsService,
                                      PriceService priceService,
                                      CleaningTimeService cleaningTimeService) {
        this.cleaningCompanyRepository = cleaningCompanyRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailService = emailService;
        this.roleService = roleService;
        this.smsService = smsService;
        this.priceService = priceService;
        this.cleaningTimeService = cleaningTimeService;
    }

    @Override
    public Page<CleaningCompany> findPaginated(int page, int size) {
        return cleaningCompanyRepository.findAll(PageRequest.of(page, size, Sort.by("label", "id")));
    }

    @Override
    public void update(CleaningCompany cleaningCompany) {
        cleaningCompanyRepository.save(cleaningCompany);
    }


    private Long saveCompany(CleaningCompanyDto registrationDto) {
        CleaningCompany company = new CleaningCompany();
        //logotype

        company.setDescription(registrationDto.getDescription());
        company.setUsername(registrationDto.getUsername());
        company.setConfirmed(false);
        company.setEmail(registrationDto.getEmail());
        company.setPhone(registrationDto.getPhone());
        Role customerRole = roleService.getRole("customer");
        company.setRoles(Collections.singletonList(customerRole));
        company.setPassword(bCryptPasswordEncoder.encode(registrationDto.getPassword()));
        company.setAddingDate(LocalDate.now());

        cleaningCompanyRepository.saveAndFlush(company);

        registrationDto.getPriceDto().setCompany(company);
        registrationDto.getCleaningTimeDto().setCompany(company);
        priceService.savePrice(registrationDto.getPriceDto());
        cleaningTimeService.saveCleaningTime(registrationDto.getCleaningTimeDto());

        return company.getId();
    }

    @Override
    public void registerCompany(CleaningCompanyDto cleaningCompanyDto) {
        Long serviceId = saveCompany(cleaningCompanyDto);
        ServiceVerification verification = new ServiceVerification();
        verification.setServiceId(serviceId);
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
        ServiceVerification verification = verifications.get(encodedString);
        if (verification == null) return Optional.empty();
        if (verification.getTryCount() >= 5) {
            verifications.remove(encodedString);
            return Optional.empty();
        }
        if (verification.getCode() == code) {
            cleaningCompanyRepository.changeConfirmStatus(true, verification.getCustomerId());
            verifications.remove(encodedString);
            return Optional.of(true);
        } else {
            verification.setTryCount(verification.getTryCount() + 1);
            return Optional.of(false);
        }
    }

    @Scheduled(fixedDelay = 1_800_000)
    public void clearOldVerifications() {
        for (Map.Entry<String, ServiceVerification> entry : verifications.entrySet()) {
            long difference = LocalTime.now().toSecondOfDay() - entry.getValue().getAddingTime().toSecondOfDay();
            if (difference > 1200 || difference < -1200) {
                verifications.remove(entry.getKey());
            }
        }
    }
}
