package com.itechart.customer.service;

import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.customer.entity.Customer;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    Page<Customer> findPaginated(int page, int size);
    void update(Customer customer);

    void preRegisterCustomer(CustomerRegistrationDto registrationDto);

    Optional<Boolean> verify(VerifyDto verifyDto);
}
