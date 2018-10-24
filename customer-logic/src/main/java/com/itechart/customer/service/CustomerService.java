package com.itechart.customer.service;

import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.entity.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> getAll();

    void preRegisterCustomer(CustomerRegistrationDto registrationDto);

    Optional<Boolean> verify(String encodedString, Integer code);
}
