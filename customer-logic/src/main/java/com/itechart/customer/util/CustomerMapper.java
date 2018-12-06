package com.itechart.customer.util;
import com.itechart.common.entity.Address;
import com.itechart.customer.dto.CustomerProfileDto;
import com.itechart.customer.dto.CustomerProfileUpdateDto;
import com.itechart.customer.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Mapper(componentModel = "spring")
public abstract class CustomerMapper {

    @Autowired
    private BCryptPasswordEncoder encoder;


    public Customer mapProfileUpdateDtoToCustomer(Customer customer, CustomerProfileUpdateDto customerProfileUpdateDto) {
        customer.setId(customerProfileUpdateDto.getId());
        customer.setUsername(customerProfileUpdateDto.getUsername());
        if (customerProfileUpdateDto.getNewPassword() != null) {
            customer.setPassword(encoder.encode(customerProfileUpdateDto.getNewPassword()));
        }
        customer.setEmail(customerProfileUpdateDto.getEmail());
        customer.setPhone(customerProfileUpdateDto.getPhone());
        customer.setAddress(customerProfileUpdateDto.getAddress());
        customer.setCleaningNotifications(customerProfileUpdateDto.getCleaningNotifications());
        return customer;
    }

    public abstract CustomerProfileDto mapCustomerToCustomerProfileDto(Customer customer);
}
