package com.itechart.service.dto;

import lombok.Data;

@Data
public class RatingDto {
    private String text;
    private Integer rate;
    private Long serviceId;
    private Long customerId;
}
