package com.itechart.customer.util;

import com.itechart.common.entity.Address;
import com.itechart.customer.dto.CustomerProfileDto;
import com.itechart.customer.dto.CustomerProfileUpdateDto;
import com.itechart.customer.entity.Customer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


public class CustomerEntityDtoMapper {

    private final BCryptPasswordEncoder encoder;

    public CustomerEntityDtoMapper(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.encoder = bCryptPasswordEncoder;
    }

    public Customer mapProfileUpdateDtoToCustomer(Customer customer, CustomerProfileUpdateDto customerProfileUpdateDto) {
        customer.setId(customerProfileUpdateDto.getId());
        customer.setUsername(customerProfileUpdateDto.getUsername());
        if (customerProfileUpdateDto.getNewPassword() != null) {
            customer.setPassword(encoder.encode(customerProfileUpdateDto.getNewPassword()));
        }
        customer.setEmail(customerProfileUpdateDto.getEmail());
        customer.setPhone(customerProfileUpdateDto.getPhone());
//         customer.setAddress(customerProfileUpdateDto.getAddress());
        customer.setCleaningNotifications(customerProfileUpdateDto.getCleaningNotifications());
        return customer;
    }

    public CustomerProfileDto mapCustomerToCustomerProfileDto(Customer customer) {
        CustomerProfileDto customerDto = new CustomerProfileDto();
        customerDto.setId(customer.getId());
        customerDto.setUsername(customer.getUsername());
        customerDto.setEmail(customer.getEmail());
        customerDto.setPhone(customer.getPhone());
        customerDto.setAddress(customer.getAddress().getAddress());
        customerDto.setCleaningNotifications(customer.getCleaningNotifications());
        return customerDto;
    }


}
