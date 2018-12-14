package com.itechart.service.service;

import com.itechart.service.dto.SearchCompanyDto;
import com.itechart.service.entity.CleaningCompany;

import java.util.List;

public interface SearchCompanyService {

    List<CleaningCompany> search(SearchCompanyDto searchCompanyDTO);

    List<CleaningCompany> sortByAveragePrice(SearchCompanyDto searchCompanyDto);

    List<CleaningCompany> sortByAverageRating(SearchCompanyDto searchCompanyDto);

    List<CleaningCompany> sortByRemoteness(SearchCompanyDto searchCompanyDto);
}
