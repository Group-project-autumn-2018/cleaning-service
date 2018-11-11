package com.itechart.service.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Data
public class PricingOptionsDto {
    @Getter @Setter private int numberOfSmallRooms;
    @Getter @Setter private int numberOfBigRooms;
    @Getter @Setter private int numberOfBathrooms;
    @Getter @Setter private BigDecimal costOfCleaningSmallRooms;
    @Getter @Setter private BigDecimal costOfCleaningBigRooms;
    @Getter @Setter private BigDecimal costOfCleaningBathrooms;
    @Getter @Setter private BigDecimal coefficient;
    @Getter @Setter private int numberOfCleaningTimes=1;


}
