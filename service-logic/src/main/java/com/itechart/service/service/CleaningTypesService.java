package com.itechart.service.service;

import com.itechart.service.dto.CleaningTypesDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.CleaningTypes;

public interface CleaningTypesService {
    CleaningTypes saveTypes(CleaningTypesDto cleaningTypesDto, CleaningCompany company);
}
