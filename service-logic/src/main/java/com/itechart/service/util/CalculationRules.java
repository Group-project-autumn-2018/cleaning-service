package com.itechart.service.util;

import com.itechart.service.dto.PricingOptionsDto;
import com.itechart.service.dto.TimingOptionsDto;

import java.math.BigDecimal;

public class CalculationRules {

    public static BigDecimal PriceCalculation(PricingOptionsDto pricingOptionsDto) {
        BigDecimal price = BigDecimal.ZERO;

        if (pricingOptionsDto == null) {
            throw new NullPointerException("return pricingOptionsDto is null at method PriceCalculation");
        }
        if (pricingOptionsDto.getCostOfCleaningSmallRooms() == null) {
            throw new NullPointerException("return value is null at method PriceCalculation");
        }
        if (pricingOptionsDto.getCostOfCleaningBigRooms() == null) {
            throw new NullPointerException("return value is null at method PriceCalculation");
        }
        if (pricingOptionsDto.getCostOfCleaningBathrooms() == null) {
            throw new NullPointerException("return value is null at method PriceCalculation");
        }

        price = (new BigDecimal(pricingOptionsDto.getCoefficient())).multiply(
                new BigDecimal(pricingOptionsDto.getNumberOfSmallRooms()).multiply(pricingOptionsDto.getCostOfCleaningSmallRooms()).add(
                        new BigDecimal(pricingOptionsDto.getNumberOfBigRooms()).multiply(pricingOptionsDto.getCostOfCleaningBigRooms()).add(
                                new BigDecimal(pricingOptionsDto.getNumberOfBathrooms()).multiply(pricingOptionsDto.getCostOfCleaningBathrooms())
                        )
                )
        );

        return price;
    }


    public static double CountingTime(TimingOptionsDto object) {
        if (object == null) {
            throw new NullPointerException("return value is null at method PriceCalculation");
        }

        return object.getCoefficient() * (object.getNumberOfSmallRooms() * object.getTimeOfCleaningSmallRooms() +
                object.getNumberOfBigRooms() * object.getTimeOfCleaningBigRooms() +
                object.getNumberOfBathrooms() * object.getTimeOfCleaningBathrooms());
    }


}
