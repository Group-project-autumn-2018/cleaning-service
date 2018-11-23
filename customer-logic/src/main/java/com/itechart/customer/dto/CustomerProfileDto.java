package com.itechart.customer.dto;

import lombok.Data;

@Data
public class CustomerProfileDto {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String address;
    private Boolean cleaningNotifications;
}
