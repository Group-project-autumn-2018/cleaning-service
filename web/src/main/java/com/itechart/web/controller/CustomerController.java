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

import javax.validation.Valid;
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
    public void setOneById(@RequestBody @Valid Customer customer) {
        customerService.update(customer);
    }


    @PostMapping("/registration")
    public ResponseEntity register(@RequestBody CustomerRegistrationDto registrationDto) {
        customerService.registerCustomer(registrationDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PostMapping("/verify")
    public ResponseEntity verify(@RequestBody VerifyDto verifyDto) {
        Optional<Boolean> result = customerService.verify(verifyDto);
        if (result.isPresent()) {
            ResponseEntity response;
            response = ResponseEntity.status(result.get() ?  HttpStatus.CREATED : HttpStatus.NOT_ACCEPTABLE).build();
            return response;
        } else {
            return ResponseEntity.status(HttpStatus.LOCKED).build();
        }
    }
}
