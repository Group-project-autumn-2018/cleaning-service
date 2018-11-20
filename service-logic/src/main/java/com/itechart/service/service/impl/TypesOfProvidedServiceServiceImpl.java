package com.itechart.service.service.impl;

import com.itechart.service.dto.CleaningTimeDto;
import com.itechart.service.dto.PriceDto;
import com.itechart.service.dto.TypesOfProvidedServiceDto;
import com.itechart.service.entity.CleaningTime;
import com.itechart.service.entity.Price;
import com.itechart.service.entity.TypesOfProvidedService;
import com.itechart.service.repository.TypesOfProvidedServiceRepository;
import com.itechart.service.service.CleaningTimeService;
import com.itechart.service.service.PriceService;
import com.itechart.service.service.TypesOfProvidedServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypesOfProvidedServiceServiceImpl implements TypesOfProvidedServiceService {

    private PriceService priceService;
    private CleaningTimeService cleaningTimeService;
    private TypesOfProvidedServiceRepository typesOfProvidedServiceRepository;

    @Autowired
    public TypesOfProvidedServiceServiceImpl(PriceService priceService, CleaningTimeService cleaningTimeService,
                                             TypesOfProvidedServiceRepository typesOfProvidedServiceRepository) {
        this.cleaningTimeService = cleaningTimeService;
        this.priceService = priceService;
        this.typesOfProvidedServiceRepository = typesOfProvidedServiceRepository;
    }

    @Override
    public void saveTypesOfProvidedService(TypesOfProvidedServiceDto typesOfProvidedServiceDto) {
        TypesOfProvidedService typesOfProvidedService = new TypesOfProvidedService();
        typesOfProvidedService.setCompany(typesOfProvidedServiceDto.getCompany());

        typesOfProvidedService.setDryCarpetCleaning(typesOfProvidedServiceDto.getDryCarpetCleaning());
        typesOfProvidedService.setFurnitureAndCoatingsCleaning(typesOfProvidedServiceDto.getFurnitureAndCoatingsCleaning());
        typesOfProvidedService.setIndustrialCleaning(typesOfProvidedServiceDto.getIndustrialCleaning());
        typesOfProvidedService.setOfficeCleaning(typesOfProvidedServiceDto.getOfficeCleaning());
        typesOfProvidedService.setPoolCleaning(typesOfProvidedService.getPoolCleaning());
        typesOfProvidedService.setRepairAndConstructionCleaning(typesOfProvidedServiceDto.getRepairAndConstructionCleaning());
        typesOfProvidedService.setStandardRoomCleaning(typesOfProvidedServiceDto.getStandardRoomCleaning());
        typesOfProvidedService.setSpringCleaning(typesOfProvidedServiceDto.getSpringCleaning());

        typesOfProvidedService.setCleaningTime(saveCleaningTime(typesOfProvidedServiceDto.getCleaningTimeDto()));
        typesOfProvidedService.setPrice(savePrice(typesOfProvidedServiceDto.getPriceDto()));

        typesOfProvidedServiceRepository.save(typesOfProvidedService);


    }

    public Price savePrice(PriceDto priceDto) {
        Price price = new Price();
        price.setStandardRoomCleaning(priceDto.getStandardRoomCleaning());
        price.setSpringCleaning(priceDto.getSpringCleaning());
        price.setRepairAndConstructionCleaning(priceDto.getRepairAndConstructionCleaning());
        price.setDryCarpetCleaning(priceDto.getDryCarpetCleaning());
        price.setOfficeCleaning(priceDto.getOfficeCleaning());
        price.setFurnitureAndCoatingsCleaning(priceDto.getFurnitureAndCoatingsCleaning());
        price.setIndustrialCleaning(priceDto.getIndustrialCleaning());
        price.setPoolCleaning(priceDto.getPoolCleaning());
        price.setTypesOfProvidedService(priceDto.getTypesOfProvidedService());
        price.setSmallRoom(priceDto.getSmallRoom());
        price.setBigRoom(priceDto.getBigRoom());
        price.setBathroom(priceDto.getBathroom());
        return price;
    }

    public CleaningTime saveCleaningTime(CleaningTimeDto cleaningTimeDto) {
        CleaningTime cleaningTime = new CleaningTime();
        cleaningTime.setTypesOfProvidedService(cleaningTimeDto.getTypesOfProvidedService());
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
        return cleaningTime;
    }
}
