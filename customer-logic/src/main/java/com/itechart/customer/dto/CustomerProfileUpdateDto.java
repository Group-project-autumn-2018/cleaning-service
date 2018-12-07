package com.itechart.customer.dto;

import com.itechart.common.entity.Address;
import lombok.Data;

@Data
public class CustomerProfileUpdateDto {
    private Long id;
    private String username;
    private String password;
    private String newPassword;
    private String email;
    private String phone;
    private Address address;
    private Boolean cleaningNotifications;
}
