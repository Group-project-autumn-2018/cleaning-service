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

    @Override
    public void saveTypes(CleaningTypesDto cleaningTypesDto, CleaningCompany company) {
        CleaningTypes cleaningTypes = new CleaningTypes();
        cleaningTypes.setCompany(company);

        cleaningTypes.setDryCarpetCleaning(cleaningTypesDto.getDryCarpetCleaning());
        cleaningTypes.setFurnitureAndCoatingsCleaning(cleaningTypesDto.getFurnitureAndCoatingsCleaning());
        cleaningTypes.setIndustrialCleaning(cleaningTypesDto.getIndustrialCleaning());
        cleaningTypes.setOfficeCleaning(cleaningTypesDto.getOfficeCleaning());
        cleaningTypes.setPoolCleaning(cleaningTypes.getPoolCleaning());
        cleaningTypes.setRepairAndConstructionCleaning(cleaningTypesDto.getRepairAndConstructionCleaning());
        cleaningTypes.setStandardRoomCleaning(cleaningTypesDto.getStandardRoomCleaning());
        cleaningTypes.setSpringCleaning(cleaningTypesDto.getSpringCleaning());

        cleaningTypes.setCleaningTime(saveCleaningTime(cleaningTypesDto.getCleaningTimeDto()));
        cleaningTypes.setPrice(savePrice(cleaningTypesDto.getPriceDto()));

        cleaningTypesRepository.save(cleaningTypes);
    }

    private Price savePrice(PriceDto priceDto) {
        Price price = new Price();
        price.setStandardRoomCleaning(priceDto.getStandardRoomCleaning());
        price.setSpringCleaning(priceDto.getSpringCleaning());
        price.setRepairAndConstructionCleaning(priceDto.getRepairAndConstructionCleaning());
        price.setDryCarpetCleaning(priceDto.getDryCarpetCleaning());
        price.setOfficeCleaning(priceDto.getOfficeCleaning());
        price.setFurnitureAndCoatingsCleaning(priceDto.getFurnitureAndCoatingsCleaning());
        price.setIndustrialCleaning(priceDto.getIndustrialCleaning());
        price.setPoolCleaning(priceDto.getPoolCleaning());
        //price.setTypesOfProvidedService(priceDto.getTypesOfProvidedService());
        price.setSmallRoom(priceDto.getSmallRoom());
        price.setBigRoom(priceDto.getBigRoom());
        price.setBathroom(priceDto.getBathroom());
        priceRepository.saveAndFlush(price);
        return price;
    }

    private CleaningTime saveCleaningTime(CleaningTimeDto cleaningTimeDto) {
        CleaningTime cleaningTime = new CleaningTime();
        //cleaningTime.setTypesOfProvidedService(cleaningTimeDto.getTypesOfProvidedService());
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
        cleaningTimeRepository.saveAndFlush(cleaningTime);
        return cleaningTime;
    }
}
