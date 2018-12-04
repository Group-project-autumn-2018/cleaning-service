package com.itechart.service.dto;

import lombok.Data;

@Data
public class CleaningTimeDto {
    private Long id;
    private Double standardRoomCleaningTime;
    private Double springCleaningTime;
    private Double repairAndConstructionCleaningTime;
    private Double dryCarpetCleaningTime;
    private Double officeCleaningTime;
    private Double furnitureAndCoatingsCleaningTime;
    private Double industrialCleaningTime;
    private Double poolCleaningTime;
    private int smallRoomCleaningTime;
    private int bigRoomCleaningTime;
    private int bathroomCleaningTime;
}
