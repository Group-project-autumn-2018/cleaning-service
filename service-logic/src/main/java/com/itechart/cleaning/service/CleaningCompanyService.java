package com.itechart.cleaning.service;

import com.itechart.cleaning.entity.CleaningCompany;
import org.springframework.data.domain.Page;

public interface CleaningCompanyService {

    Page<CleaningCompany> findPaginated(int page, int size);

    void update(CleaningCompany cleaning);
}
