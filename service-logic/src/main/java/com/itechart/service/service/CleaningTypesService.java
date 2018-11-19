package com.itechart.service.service;

import com.itechart.service.dto.CleaningTypesDto;
import com.itechart.service.entity.CleaningCompany;

public interface CleaningTypesService {
    void saveTypes(CleaningTypesDto cleaningTypesDto, CleaningCompany company);
}
