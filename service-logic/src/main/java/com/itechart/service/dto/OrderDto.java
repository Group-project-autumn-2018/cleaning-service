package com.itechart.service.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class OrderDto {
    private Long companyId;
    private Long customerId;
    private AddressDto address;
    private String cleaningType;
    private Integer smallRoomsCount;
    private Integer bigRoomsCount;
    private Integer bathroomsCount;
    private String cleaningDay;
    private String frequency;
    private String duration;
    private LocalTime estimatedTime;
    private String email;
}
