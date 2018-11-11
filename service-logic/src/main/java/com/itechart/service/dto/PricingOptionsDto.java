package com.itechart.service.dto;

import lombok.Data;


import java.math.BigDecimal;


@Data
public class PricingOptionsDto {
    private int numberOfSmallRooms;
     private int numberOfBigRooms;
     private int numberOfBathrooms;
     private BigDecimal costOfCleaningSmallRooms;
     private BigDecimal costOfCleaningBigRooms;
     private BigDecimal costOfCleaningBathrooms;
     private double coefficient;
     private int numberOfCleaningTimes=1;


}
