package com.itechart.service.service;

import com.itechart.service.dto.CleaningTimeDto;
import com.itechart.service.entity.CleaningTime;

public interface CleaningTimeService {

    void saveCleaningTime(CleaningTimeDto cleaningTimeDto);
}
