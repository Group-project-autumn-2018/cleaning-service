package com.itechart.service.service;

import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.domain.Page;

public interface CleaningCompanyService {

    Page<CleaningCompany> findPaginated(int page, int size);

    void update(CleaningCompany company);

    CleaningCompany getOne(Long id);
}
