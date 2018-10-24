package com.itechart.customer.util;

import com.itechart.customer.dto.CustomerRegistrationDto;
import lombok.Data;

import java.time.LocalTime;

@Data
public class CustomerVerification {
    private LocalTime addingTime;
    private int tryCount;
    private int code;
    private CustomerRegistrationDto registrationDto;
}
