package com.itechart.customer.dto;
import lombok.Data;

@Data
public class CustomerProfileUpdateDto {
    private Long id;
    private String username;
    private String password;
    private String newPassword;
    private String email;
    private String phone;
    private String address;
    private Boolean cleaningNotifications;
}
