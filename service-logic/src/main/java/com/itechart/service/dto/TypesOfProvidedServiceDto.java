package com.itechart.service.dto;

import com.itechart.service.entity.CleaningCompany;
import lombok.Data;

@Data
public class TypesOfProvidedServiceDto {

    private CleaningCompany company;
    private Boolean standardRoomCleaning;
    private Boolean springCleaning;
    private Boolean repairAndConstructionCleaning;
    private Boolean dryCarpetCleaning;
    private Boolean officeCleaning;
    private Boolean furnitureAndCoatingsCleaning;
    private Boolean industrialCleaning;
    private Boolean poolCleaning;
    private PriceDto priceDto;
    private CleaningTimeDto cleaningTimeDto;
}
