package com.itechart.service.dto;

import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.TypesOfProvidedService;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PriceDto {

    private BigDecimal basePrice;
    private double standardRoomCleaning;
    private double springCleaning;
    private double repairAndConstructionCleaning;
    private double dryCarpetCleaning;
    private double officeCleaning;
    private double furnitureAndCoatingsCleaning;
    private double industrialCleaning;
    private double poolCleaning;
    private BigDecimal smallRoom;
    private BigDecimal bigRoom;
    private BigDecimal bathroom;
    private TypesOfProvidedService typesOfProvidedService;
}
