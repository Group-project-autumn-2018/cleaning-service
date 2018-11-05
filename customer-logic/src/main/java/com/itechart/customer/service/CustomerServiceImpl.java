package com.itechart.customer.service;

import com.itechart.customer.entity.Customer;
import com.itechart.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Page<Customer> findPaginated(int page, int size) {
        return customerRepository.findAll(PageRequest.of(page, size, Sort.by("username", "id")));
    }


    public void update(Customer customer){
        customerRepository.save(customer);
    }
    
}
