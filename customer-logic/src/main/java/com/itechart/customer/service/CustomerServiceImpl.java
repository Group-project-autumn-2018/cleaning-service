package com.itechart.customer.service;

import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.entity.Customer;
import com.itechart.customer.repository.CustomerRepository;
import com.itechart.customer.util.CustomerVerification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private ConcurrentMap<String, CustomerVerification> verifications = new ConcurrentHashMap<>();

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository,
                               BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.customerRepository = customerRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    private void registerCustomer(CustomerRegistrationDto registrationDto) {
        Customer customer = new Customer();
        customer.setUsername(registrationDto.getUsername());
        customer.setConfirmed(true);
        customer.setEmail(registrationDto.getEmail());
        customer.setPhone(registrationDto.getPhone());
        customer.setPassword(bCryptPasswordEncoder.encode(registrationDto.getPassword()));
    }

    @Override
    public void preRegisterCustomer(CustomerRegistrationDto registrationDto) {
        CustomerVerification verification = new CustomerVerification();
        verification.setRegistrationDto(registrationDto);
        verification.setAddingTime(LocalTime.now());
        verification.setTryCount(0);
        byte[] token = (registrationDto.getUsername() + registrationDto.getPassword())
                .getBytes(Charset.forName("UTF-8"));
        String encodedToken = Base64.getEncoder().encodeToString(token);
        int randomCode = (int) (Math.random() * 1000000);
        verification.setCode(randomCode);
        verifications.put(encodedToken, verification);
    }

    @Override
    public Optional<Boolean> verify(String encodedString, Integer code) {
        CustomerVerification verification = verifications.get(encodedString);
        if (verification == null) return Optional.empty();
        if (verification.getTryCount() > 5) {
            verifications.remove(encodedString);
            return Optional.empty();
        }
        if (verification.getCode() == code) {
            registerCustomer(verification.getRegistrationDto());
            verifications.remove(encodedString);
            return Optional.of(true);
        } else {
            verification.setTryCount(verification.getTryCount() + 1);
            return Optional.of(false);
        }
    }

    @Scheduled(fixedDelay = 1800000)
    public void scheduleFixedDelayTask() {
        for (Map.Entry<String, CustomerVerification> entry : verifications.entrySet()){
            long difference = LocalTime.now().toSecondOfDay() - entry.getValue().getAddingTime().toSecondOfDay();
            if (difference > 1000 || difference < 0) {
                verifications.remove(entry.getKey());
            }
        }
    }
}
