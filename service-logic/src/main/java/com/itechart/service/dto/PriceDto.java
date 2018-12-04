package com.itechart.service.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PriceDto {
    private Long id;
    private BigDecimal basePrice;
    private double standardRoomCleaning;
    private double springCleaning;
    private double repairAndConstructionCleaning;
    private double dryCarpetCleaning;
    private double officeCleaning;
    private double furnitureAndCoatingsCleaning;
    private double industrialCleaning;
    private double poolCleaning;
    private double smallRoom;
    private double bigRoom;
    private double bathroom;
}
