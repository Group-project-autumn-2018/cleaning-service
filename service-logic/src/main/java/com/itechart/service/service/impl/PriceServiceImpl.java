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

    @Override
    public void savePrice(PriceDto priceDto) {
        Price price = new Price();
        price.setStandardRoomCleaning(priceDto.getStandardRoomCleaning());
        price.setSpringCleaning(priceDto.getSpringCleaning());
        price.setRepairAndConstructionCleaning(priceDto.getRepairAndConstructionCleaning());
        price.setDryCarpetCleaning(priceDto.getDryCarpetCleaning());
        price.setOfficeCleaning(priceDto.getOfficeCleaning());
        price.setFurnitureAndCoatingsCleaning(priceDto.getFurnitureAndCoatingsCleaning());
        price.setIndustrialCleaning(priceDto.getIndustrialCleaning());
        price.setPoolCleaning(priceDto.getPoolCleaning());
        price.setCompany(priceDto.getCompany());
        price.setSmallRoom(priceDto.getSmallRoom());
        price.setBigRoom(priceDto.getBigRoom());
        price.setBathroom(priceDto.getBathroom());
        priceRepository.saveAndFlush(price);
    }
}
