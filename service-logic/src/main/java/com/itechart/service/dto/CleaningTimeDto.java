package com.itechart.service.dto;

import lombok.Data;

@Data
public class CleaningTimeDto {
    private int standardRoomCleaningTime;
    private int springCleaningTime;
    private int repairAndConstructionCleaningTime;
    private int dryCarpetCleaningTime;
    private int officeCleaningTime;
    private int furnitureAndCoatingsCleaningTime;
    private int industrialCleaningTime;
    private int poolCleaningTime;
    private int smallRoomCleaningTime;
    private int bigRoomCleaningTime;
    private int bathroomCleaningTime;
}
