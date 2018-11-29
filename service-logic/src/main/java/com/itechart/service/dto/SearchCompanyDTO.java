package com.itechart.service.dto;

import lombok.Data;

@Data
public class SearchCompanyDTO {

    private String email;

    private String address;

    private CleaningTypesDto cleaningTypesDto;
}
