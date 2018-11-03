package com.itechart.cleaning.service.impl;

import com.itechart.cleaning.entity.Cleaning;
import com.itechart.cleaning.repository.CleaningRepository;
import com.itechart.cleaning.service.CleaningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CleaningServiceImpl implements CleaningService {

    private final CleaningRepository cleaningRepository;

    @Autowired
    public CleaningServiceImpl(CleaningRepository cleaningRepository) {
        this.cleaningRepository = cleaningRepository;
    }

    @Override
    public Page<Cleaning> findPaginated(int page, int size) {
        return cleaningRepository.findAll(PageRequest.of(page, size, Sort.by("label", "id")));
    }

    @Override
    public void update(Cleaning cleaning) {
        cleaningRepository.save(cleaning);
    }
}
