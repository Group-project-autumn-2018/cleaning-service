package com.itechart.customer.service;
import com.itechart.customer.entity.Customer;
import org.springframework.data.domain.Page;

public interface CustomerService {

    Page<Customer> findPaginated(int page, int size);
    void update(Customer customer);

}
