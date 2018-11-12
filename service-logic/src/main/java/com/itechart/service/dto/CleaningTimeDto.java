package com.itechart.service.dto;

import com.itechart.service.entity.CleaningCompany;
import lombok.Data;

@Data
public class CleaningTimeDto {
    private int smallRoomCleaningTime;
    private int bigRoomCleaningTime;
    private int bathroomCleaningTime;
    private CleaningCompany company;
}
