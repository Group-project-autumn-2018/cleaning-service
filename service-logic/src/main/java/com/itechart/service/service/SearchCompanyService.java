package com.itechart.service.service;

import com.itechart.service.dto.SearchCompanyDTO;
import com.itechart.service.entity.CleaningCompany;

import java.util.List;

public interface SearchCompanyService {

    List<CleaningCompany> search(SearchCompanyDTO searchCompanyDTO);

//    List<CleaningTypes> search();
}
