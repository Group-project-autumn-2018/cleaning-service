package com.itechart.customer.dto;

import lombok.Data;

@Data
public class VerifyDto {
    private String encodedString;
    private Integer code;
}
