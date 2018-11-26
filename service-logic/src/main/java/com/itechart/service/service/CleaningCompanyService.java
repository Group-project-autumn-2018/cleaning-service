package com.itechart.service.service;

import com.itechart.customer.dto.VerifyDto;
import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface CleaningCompanyService {

    Page<CleaningCompany> findPaginated(int page, int size);

    void update(CleaningCompanyDto company);

    void registerCompany(CleaningCompanyDto cleaningCompanyDto, MultipartFile logotype);

    Optional<Boolean> verify(VerifyDto verifyDto);
    CleaningCompany getOne(Long id);
}
