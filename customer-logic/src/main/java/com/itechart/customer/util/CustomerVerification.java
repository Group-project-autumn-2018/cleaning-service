package com.itechart.customer.util;

import lombok.Data;

import java.time.LocalTime;

@Data
public class CustomerVerification {
    private LocalTime addingTime;
    private int tryCount;
    private int code;
    private Long customerId;
}
