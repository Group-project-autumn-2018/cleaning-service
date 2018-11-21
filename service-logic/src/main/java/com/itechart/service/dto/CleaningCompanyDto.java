package com.itechart.service.dto;

import lombok.Data;

@Data
public class CleaningCompanyDto {
    private String username;
    private String phone;
    private String email;
    private String password;
    private String description;
    private AddressDto address;
    private CleaningTypesDto cleaningTypesDto;
}
