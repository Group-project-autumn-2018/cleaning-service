package com.itechart.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
