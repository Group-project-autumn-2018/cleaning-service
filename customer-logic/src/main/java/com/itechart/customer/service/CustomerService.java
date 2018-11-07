package com.itechart.customer.service;

import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.customer.entity.Customer;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> getAll();

    void registerCustomer(CustomerRegistrationDto registrationDto);

    Optional<Boolean> verify(VerifyDto verifyDto);

    Page<Customer> findPaginated(int page, int size);

    void update(Customer customer);
}
