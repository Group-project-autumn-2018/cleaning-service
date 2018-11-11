package com.itechart.service.util;

import com.itechart.service.dto.PricingOptionsDto;
import com.itechart.service.dto.TimingOptionsDto;

import java.math.BigDecimal;

public class CalculationRules {

    public static BigDecimal PriceCalculation(PricingOptionsDto pricingOptionsDto){
        BigDecimal price=BigDecimal.ZERO;

            if(pricingOptionsDto==null){
                throw new NullPointerException("return pricingOptionsDto is null at method PriceCalculation");
            }
            if(pricingOptionsDto.getCostOfCleaningSmallRooms()==null){
                throw new NullPointerException("return value is null at method PriceCalculation");
            }
            if(pricingOptionsDto.getCostOfCleaningBigRooms()==null){
                throw new NullPointerException("return value is null at method PriceCalculation");
            }
            if(pricingOptionsDto.getCostOfCleaningBathrooms()==null){
                throw new NullPointerException("return value is null at method PriceCalculation");
            }


            CalculationRules object =new CalculationRules();
            price=object.calculateCost(pricingOptionsDto.getNumberOfSmallRooms(),pricingOptionsDto.getCostOfCleaningSmallRooms());
            price.add(object.calculateCost(pricingOptionsDto.getNumberOfBigRooms(),pricingOptionsDto.getCostOfCleaningBigRooms()));
            price.add(object.calculateCost(pricingOptionsDto.getNumberOfBathrooms(),pricingOptionsDto.getCostOfCleaningBathrooms()));
            price.multiply(new BigDecimal(pricingOptionsDto.getCoefficient()));
            price=object.calculateCost(pricingOptionsDto.getNumberOfCleaningTimes(),price);



        return price;
    }

    public  BigDecimal calculateCost(int itemQuantity, BigDecimal itemPrice){
        BigDecimal itemCost  = itemPrice.multiply(new BigDecimal(itemQuantity));
        return  itemCost;
    }

    public static double CountingTime(TimingOptionsDto object){
        if(object==null){
            throw new NullPointerException("return value is null at method PriceCalculation");
        }

       return object.getCoefficient()*( object.getNumberOfSmallRooms()*object.getTimeOfCleaningSmallRooms()+
                object.getNumberOfBigRooms()*object.getTimeOfCleaningBigRooms()+
                object.getNumberOfBathrooms()*object.getTimeOfCleaningBathrooms());
    }



}
