package com.itechart.service.service;

import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.dto.SearchCompanyDto;

import java.util.List;

public interface SearchCompanyService {

    List<CleaningCompanyDto> search(SearchCompanyDto searchCompanyDTO);
}
