package com.itechart.service.service;

import com.itechart.customer.dto.VerifyDto;
import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface CleaningCompanyService {

    Page<CleaningCompany> findPaginated(int page, int size);

    void update(CleaningCompany company);

    void registerCompany(CleaningCompanyDto cleaningCompanyDto);

    Optional<Boolean> verify(VerifyDto verifyDto);
}
