package com.itechart.cleaning.service;

import org.springframework.data.domain.Page;

public interface CleaningService {

    Page<Cleaning> findPaginated(int page, int size);

    void update(Cleaning cleaning);
}
