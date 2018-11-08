package com.itechart.web.controller;

import com.itechart.customer.dto.CustomerRegistrationDto;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.customer.entity.Customer;
import com.itechart.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public void setOneById(@RequestBody Customer customer) {
        customerService.update(customer);
    }



    @PostMapping("/registration")
    public ResponseEntity preRegister(@RequestBody CustomerRegistrationDto registrationDto) {
        customerService.preRegisterCustomer(registrationDto);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @PostMapping("/verify")
    public ResponseEntity verify(@RequestBody VerifyDto verifyDto) {
        Optional<Boolean> result = customerService.verify(verifyDto);
        if (result.isPresent()) {
            ResponseEntity response;
            response = ResponseEntity.ok(result.get() ?  HttpStatus.CREATED : HttpStatus.NOT_ACCEPTABLE);
            return response;
        } else {
            return ResponseEntity.ok(HttpStatus.LOCKED);
        }
    }
}
