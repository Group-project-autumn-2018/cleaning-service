package com.itechart.service.service.impl;


import com.itechart.service.dto.CleaningTimeDto;
import com.itechart.service.entity.CleaningTime;
import com.itechart.service.repository.CleaningTimeRepository;
import com.itechart.service.service.CleaningTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CleaningTimeServiceImpl implements CleaningTimeService {
    private final CleaningTimeRepository cleaningTimeRepository;

    @Autowired
    public CleaningTimeServiceImpl(CleaningTimeRepository cleaningTimeRepository) {
        this.cleaningTimeRepository=cleaningTimeRepository;
    }

    @Override
    public void saveCleaningTime(CleaningTimeDto cleaningTimeDto) {
        CleaningTime cleaningTime = new CleaningTime();
        cleaningTime.setCompany(cleaningTimeDto.getCompany());
        cleaningTime.setSmallRoom(cleaningTimeDto.getSmallRoom());
        cleaningTime.setBigRoom(cleaningTimeDto.getBigRoom());
        cleaningTime.setBathroom(cleaningTimeDto.getBathroom());
        cleaningTimeRepository.saveAndFlush(cleaningTime);
    }


}
