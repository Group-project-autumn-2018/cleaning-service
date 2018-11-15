package com.itechart.service.util;

import lombok.Data;

import java.time.LocalTime;

@Data
public class ServiceVerification {
    private LocalTime addingTime;
    private int tryCount;
    private int code;
    private Long serviceId;
}
