package com.itechart.service.service.impl;


import com.itechart.service.dto.PriceDto;
import com.itechart.service.entity.Price;
import com.itechart.service.repository.PriceRepository;
import com.itechart.service.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PriceServiceImpl implements PriceService {
    private final PriceRepository priceRepository;

    @Autowired
    public PriceServiceImpl(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }



}
