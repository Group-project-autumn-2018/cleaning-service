package com.itechart.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SearchCompanyDto {

    private String email;
    private String address;
    private String cleaningType;
    private Integer smallRoomsCount;
    private Integer bigRoomsCount;
    private Integer bathroomsCount;
    private Double latitude;
    private Double longitude;
    private BigDecimal price;
    private String sort;
}
