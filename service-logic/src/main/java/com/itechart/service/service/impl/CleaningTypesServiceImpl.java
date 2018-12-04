package com.itechart.service.service.impl;

import com.itechart.service.dto.CleaningTimeDto;
import com.itechart.service.dto.CleaningTypesDto;
import com.itechart.service.dto.PriceDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.CleaningTime;
import com.itechart.service.entity.CleaningTypes;
import com.itechart.service.entity.Price;
import com.itechart.service.repository.CleaningTimeRepository;
import com.itechart.service.repository.CleaningTypesRepository;
import com.itechart.service.repository.PriceRepository;
import com.itechart.service.service.CleaningTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CleaningTypesServiceImpl implements CleaningTypesService {
    private final PriceRepository priceRepository;
    private final CleaningTimeRepository cleaningTimeRepository;
    private CleaningTypesRepository cleaningTypesRepository;

    @Autowired
    public CleaningTypesServiceImpl(CleaningTypesRepository cleaningTypesRepository,
                                    PriceRepository priceRepository,
                                    CleaningTimeRepository cleaningTimeRepository) {
        this.cleaningTypesRepository = cleaningTypesRepository;
        this.priceRepository = priceRepository;
        this.cleaningTimeRepository = cleaningTimeRepository;
    }

    @Transactional
    @Override
    public CleaningTypes saveTypes(CleaningTypesDto cleaningTypesDto, CleaningCompany company) {
        CleaningTypes cleaningTypes = new CleaningTypes();
        if (cleaningTypesDto.getId() != null && cleaningTypesDto.getId() > 0) {
            cleaningTypes.setId(cleaningTypesDto.getId());
        }
        cleaningTypes.setCompany(company);

        cleaningTypes.setDryCarpetCleaning(cleaningTypesDto.getDryCarpetCleaning());
        cleaningTypes.setFurnitureAndCoatingsCleaning(cleaningTypesDto.getFurnitureAndCoatingsCleaning());
        cleaningTypes.setIndustrialCleaning(cleaningTypesDto.getIndustrialCleaning());
        cleaningTypes.setOfficeCleaning(cleaningTypesDto.getOfficeCleaning());
        cleaningTypes.setPoolCleaning(cleaningTypesDto.getPoolCleaning());
        cleaningTypes.setRepairAndConstructionCleaning(cleaningTypesDto.getRepairAndConstructionCleaning());
        cleaningTypes.setStandardRoomCleaning(cleaningTypesDto.getStandardRoomCleaning());
        cleaningTypes.setSpringCleaning(cleaningTypesDto.getSpringCleaning());

        cleaningTypes.setCleaningTime(saveCleaningTime(cleaningTypesDto.getCleaningTime()));
        cleaningTypes.setPrice(savePrice(cleaningTypesDto.getPrice()));

        cleaningTypesRepository.save(cleaningTypes);
        return cleaningTypes;
    }

    private Price savePrice(PriceDto priceDto) {
        Price price = new Price();
        if (priceDto.getId() != null && priceDto.getId() > 0) {
            price.setId(priceDto.getId());
        }
        price.setBasePrice(priceDto.getBasePrice());
        price.setStandardRoomCleaning(priceDto.getStandardRoomCleaning());
        price.setSpringCleaning(priceDto.getSpringCleaning());
        price.setRepairAndConstructionCleaning(priceDto.getRepairAndConstructionCleaning());
        price.setDryCarpetCleaning(priceDto.getDryCarpetCleaning());
        price.setOfficeCleaning(priceDto.getOfficeCleaning());
        price.setFurnitureAndCoatingsCleaning(priceDto.getFurnitureAndCoatingsCleaning());
        price.setIndustrialCleaning(priceDto.getIndustrialCleaning());
        price.setPoolCleaning(priceDto.getPoolCleaning());
        price.setSmallRoom(priceDto.getSmallRoom());
        price.setBigRoom(priceDto.getBigRoom());
        price.setBathroom(priceDto.getBathroom());
        priceRepository.save(price);
        return price;
    }

    private CleaningTime saveCleaningTime(CleaningTimeDto cleaningTimeDto) {
        CleaningTime cleaningTime = new CleaningTime();
        if (cleaningTimeDto.getId() != null && cleaningTimeDto.getId() > 0) {
            cleaningTime.setId(cleaningTimeDto.getId());
        }
        cleaningTime.setStandardRoomCleaningTime(cleaningTimeDto.getStandardRoomCleaningTime());
        cleaningTime.setSpringCleaningTime(cleaningTimeDto.getSpringCleaningTime());
        cleaningTime.setRepairAndConstructionCleaningTime(cleaningTimeDto.getRepairAndConstructionCleaningTime());
        cleaningTime.setDryCarpetCleaningTime(cleaningTimeDto.getDryCarpetCleaningTime());
        cleaningTime.setOfficeCleaningTime(cleaningTimeDto.getOfficeCleaningTime());
        cleaningTime.setFurnitureAndCoatingsCleaningTime(cleaningTimeDto.getFurnitureAndCoatingsCleaningTime());
        cleaningTime.setIndustrialCleaningTime(cleaningTimeDto.getIndustrialCleaningTime());
        cleaningTime.setPoolCleaningTime(cleaningTimeDto.getPoolCleaningTime());
        cleaningTime.setSmallRoomCleaningTime(cleaningTimeDto.getSmallRoomCleaningTime());
        cleaningTime.setBigRoomCleaningTime(cleaningTimeDto.getBigRoomCleaningTime());
        cleaningTime.setBathroomCleaningTime(cleaningTimeDto.getBathroomCleaningTime());
        cleaningTimeRepository.save(cleaningTime);
        return cleaningTime;
    }
}
