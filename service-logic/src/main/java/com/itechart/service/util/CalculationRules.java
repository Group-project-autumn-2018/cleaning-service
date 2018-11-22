package com.itechart.service.util;

import com.itechart.service.dto.OrderDto;
import com.itechart.service.dto.TimingOptionsDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.CleaningTime;
import com.itechart.service.entity.CleaningTypes;
import com.itechart.service.entity.Price;
import com.itechart.service.repository.CleaningCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.time.LocalTime;

public class CalculationRules {

    private Double priceCoefficient = new Double(0);
    private Double cleaningTime =  new Double(0);
    private final CleaningCompanyRepository cleaningCompanyRepository;

    @Autowired
    public CalculationRules(CleaningCompanyRepository cleaningCompanyRepository) {
        this.cleaningCompanyRepository = cleaningCompanyRepository;
    }

    public BigDecimal calculateAvaregePrice(OrderDto orderDto) {
        BigDecimal averagePrice = BigDecimal.ZERO;
        CleaningTypes cleaningTypes = null;
        if (orderDto.getCompany() == null) {
            return BigDecimal.ZERO;
        }
        cleaningTypes = cleaningCompanyRepository.getOne(orderDto.getCompany()).getCleaningTypes();

        if (cleaningTypes == null) {
            return BigDecimal.ZERO;
        }

        getValueFromCleaningTypes(orderDto.getCleaningType(), cleaningTypes);

        averagePrice.add(getRoomPrice(cleaningTypes.getPrice().getBasePrice(), orderDto.getSmallRoomsCount(),
                cleaningTypes.getPrice().getSmallRoom()));
        averagePrice.add(getRoomPrice(cleaningTypes.getPrice().getBasePrice(), orderDto.getBigRoomsCount(),
                cleaningTypes.getPrice().getBigRoom()));
        averagePrice.add(getRoomPrice(cleaningTypes.getPrice().getBasePrice(), orderDto.getBathroomsCount(),
                cleaningTypes.getPrice().getBathroom()));
        averagePrice = averagePrice.multiply(BigDecimal.valueOf(priceCoefficient));

        return averagePrice;
    }

    private void getValueFromCleaningTypes(String cleaningTypesString, CleaningTypes cleaningType) {
        switch (cleaningTypesString) {
            case "Standard room cleaning":
                priceCoefficient = cleaningType.getPrice().getStandardRoomCleaning();
                cleaningTime = cleaningType.getCleaningTime().getStandardRoomCleaningTime();
                break;
            case "Spring-cleaning":
                priceCoefficient = cleaningType.getPrice().getSpringCleaning();
                cleaningTime = cleaningType.getCleaningTime().getSpringCleaningTime();
                break;
            case "Cleaning after repair and construction":
                priceCoefficient = cleaningType.getPrice().getRepairAndConstructionCleaning();
                cleaningTime = cleaningType.getCleaningTime().getRepairAndConstructionCleaningTime();
                break;
            case "Dry carpet cleaning":
                priceCoefficient = cleaningType.getPrice().getDryCarpetCleaning();
                cleaningTime = cleaningType.getCleaningTime().getDryCarpetCleaningTime();
                break;
            case "Office cleaning":
                priceCoefficient = cleaningType.getPrice().getOfficeCleaning();
                cleaningTime = cleaningType.getCleaningTime().getOfficeCleaningTime();
                break;
            case "Dry cleaning of furniture and coatings":
                priceCoefficient = cleaningType.getPrice().getFurnitureAndCoatingsCleaning();
                cleaningTime = cleaningType.getCleaningTime().getFurnitureAndCoatingsCleaningTime();
                break;
            case "Industrial cleaning":
                priceCoefficient = cleaningType.getPrice().getIndustrialCleaning();
                cleaningTime = cleaningType.getCleaningTime().getIndustrialCleaningTime();
                break;
            case "Pool cleaning":
                priceCoefficient = cleaningType.getPrice().getPoolCleaning();
                cleaningTime = cleaningType.getCleaningTime().getPoolCleaningTime();
                break;
            default:
                return;
        }
    }

    private BigDecimal getRoomPrice(BigDecimal basePrice, Integer roomsCount, Double roomsCoefficient) {
        return (basePrice.multiply(BigDecimal.valueOf(roomsCount))).multiply(BigDecimal.valueOf(roomsCoefficient));
    }

    public Integer getEndCleaningTime(OrderDto orderDto) {
        Integer timeInMinutes = 0;
        CleaningTypes cleaningTypes = null;
        if (orderDto.getCompany() == null) {
            return 0;
        }
        cleaningTypes = cleaningCompanyRepository.getOne(orderDto.getCompany()).getCleaningTypes();

        if (cleaningTypes == null) {
            return 0;
        }
        getValueFromCleaningTypes(orderDto.getCleaningType(), cleaningTypes);

        timeInMinutes += (cleaningTypes.getCleaningTime().getSmallRoomCleaningTime() *
                orderDto.getSmallRoomsCount());
        timeInMinutes += (cleaningTypes.getCleaningTime().getBigRoomCleaningTime() *
                orderDto.getBigRoomsCount());
        timeInMinutes += (cleaningTypes.getCleaningTime().getBathroomCleaningTime() *
                orderDto.getBathroomsCount());
        timeInMinutes = (int)(timeInMinutes * cleaningTime);

        return timeInMinutes;
    }


}
