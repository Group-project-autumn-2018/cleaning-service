package com.itechart.service.dto;

import lombok.Data;

@Data
public class CleaningTypesDto {
    private Long id;
    private Boolean standardRoomCleaning;
    private Boolean springCleaning;
    private Boolean repairAndConstructionCleaning;
    private Boolean dryCarpetCleaning;
    private Boolean officeCleaning;
    private Boolean furnitureAndCoatingsCleaning;
    private Boolean industrialCleaning;
    private Boolean poolCleaning;
    private PriceDto price;
    private CleaningTimeDto cleaningTime;
}
