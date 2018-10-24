package com.itechart.customer.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerRegistrationDto {
    private String username;
    private String phone;
    private String email;
    private String password;
}
