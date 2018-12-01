package com.itechart.service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchCompanyDto {

    private String email;
    private String address;
    private CleaningTypesDto cleaningTypesDto;
    private Integer smallRoomsCount;
    private Integer bigRoomsCount;
    private Integer bathroomsCount;
    private Double latitude;
    private Double longitude;
}
