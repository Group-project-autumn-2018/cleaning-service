package com.itechart.customer.dto;

import lombok.Data;

@Data
public class CustomerRegistrationDto {
    private String username;
    private String phone;
    private String email;
    private String password;
}
