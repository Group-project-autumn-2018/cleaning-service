package com.itechart.service.util;

import com.itechart.service.dto.PricingOptionsDto;
import org.apache.log4j.Logger;

import java.math.BigDecimal;

public class CalculationRules {
    final static Logger logger = Logger.getLogger(CalculationRules.class);

    public static BigDecimal PriceCalculation(PricingOptionsDto pricingOptionsDto){
        BigDecimal price=BigDecimal.ZERO;

        try{
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
            if(pricingOptionsDto.getCoefficient()==null){
                throw new NullPointerException("return value is null at method PriceCalculation");
            }

            CalculationRules object =new CalculationRules();
            price=object.calculateCost(pricingOptionsDto.getNumberOfSmallRooms(),pricingOptionsDto.getCostOfCleaningSmallRooms());
            price.add(object.calculateCost(pricingOptionsDto.getNumberOfBigRooms(),pricingOptionsDto.getCostOfCleaningBigRooms()));
            price.add(object.calculateCost(pricingOptionsDto.getNumberOfBathrooms(),pricingOptionsDto.getCostOfCleaningBathrooms()));
            price.multiply(pricingOptionsDto.getCoefficient());
            price=object.calculateCost(pricingOptionsDto.getNumberOfCleaningTimes(),price);

        }catch (NullPointerException e){
            logger.info(e);
        }

        return price;
    }

    public  BigDecimal calculateCost(int itemQuantity, BigDecimal itemPrice){
        BigDecimal itemCost  = itemPrice.multiply(new BigDecimal(itemQuantity));
        return  itemCost;
    }

}
