package com.itechart.service.service.impl;

import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.repository.CleaningCompanyRepository;
import com.itechart.service.service.CleaningCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CleaningCompanyServiceImpl implements CleaningCompanyService {

    private final CleaningCompanyRepository cleaningCompanyRepository;

    @Autowired
    public CleaningCompanyServiceImpl(CleaningCompanyRepository cleaningCompanyRepository) {
        this.cleaningCompanyRepository = cleaningCompanyRepository;
    }

    @Override
    public Page<CleaningCompany> findPaginated(int page, int size) {
        return cleaningCompanyRepository.findAll(PageRequest.of(page, size, Sort.by("username", "id")));
    }

    @Override
    public void update(CleaningCompany cleaningCompany) {
        cleaningCompanyRepository.save(cleaningCompany);
    }

    @Override
    public CleaningCompany getOne(Long id) {
        Optional<CleaningCompany> companyOptional = cleaningCompanyRepository.findById(id);
        return companyOptional.orElse(null);
    }
}
