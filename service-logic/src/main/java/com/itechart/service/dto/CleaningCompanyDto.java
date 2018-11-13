package com.itechart.service.dto;

import lombok.Data;

@Data
public class CleaningCompanyDto {
    private String username;
    private String phone;
    private String email;
    private String password;
    private String logotype;
    private String description;
    private PriceDto priceDto;
    private CleaningTimeDto cleaningTimeDto;
}
