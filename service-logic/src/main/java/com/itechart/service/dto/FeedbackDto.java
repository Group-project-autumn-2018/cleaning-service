package com.itechart.service.dto;

import lombok.Data;

@Data
public class FeedbackDto {
    private String text;
    private Integer rate;
    private Long serviceId;
}
