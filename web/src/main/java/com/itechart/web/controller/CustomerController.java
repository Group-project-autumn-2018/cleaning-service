package com.itechart.web.controller;

import com.itechart.customer.entity.Customer;
import com.itechart.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping()
    public Page<Customer> findPaginated(
            @RequestParam("page") int page, @RequestParam("size") int size) {

        Page<Customer> resultPage = customerService.findPaginated(page, size);

        return resultPage;
    }


    @PutMapping("/{сustomerId}")
    public void getOneById(@RequestBody Customer customer) {
        customerService.update(customer);
    }
}
