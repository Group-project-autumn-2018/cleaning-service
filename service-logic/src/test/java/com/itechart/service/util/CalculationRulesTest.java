package com.itechart.service.util;

import com.itechart.service.dto.PricingOptionsDto;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.math.BigDecimal;

import static org.junit.Assert.*;

public class CalculationRulesTest {

    private CalculationRules calculationRules;

    @Before
    public void initTest() {
        calculationRules = new CalculationRules();
    }

    @After
    public void afterTest() {
        calculationRules = null;
    }

    @Test
    public void PriceCalculation() throws Exception {
        PricingOptionsDto pricingOptionsDto=new PricingOptionsDto();
        pricingOptionsDto.setCoefficient(1);
        pricingOptionsDto.setNumberOfSmallRooms(2);
        pricingOptionsDto.setCostOfCleaningSmallRooms(new BigDecimal(15));
        pricingOptionsDto.setNumberOfBigRooms(2);
        pricingOptionsDto.setCostOfCleaningBigRooms(new BigDecimal(30));
        pricingOptionsDto.setNumberOfBathrooms(3);
        pricingOptionsDto.setCostOfCleaningBathrooms(new BigDecimal(31));
        assertEquals(new BigDecimal(183), CalculationRules.PriceCalculation(pricingOptionsDto));
    }

    @Test
    public void PriceCalculation1() throws Exception {
        PricingOptionsDto pricingOptionsDto=new PricingOptionsDto();
        pricingOptionsDto.setCoefficient(1);
        pricingOptionsDto.setNumberOfSmallRooms(2);
        pricingOptionsDto.setCostOfCleaningSmallRooms(new BigDecimal(23.25));
        pricingOptionsDto.setNumberOfBigRooms(2);
        pricingOptionsDto.setCostOfCleaningBigRooms(new BigDecimal(30));
        pricingOptionsDto.setNumberOfBathrooms(3);
        pricingOptionsDto.setCostOfCleaningBathrooms(new BigDecimal(23.25));
        assertEquals(new BigDecimal(176.25), CalculationRules.PriceCalculation(pricingOptionsDto));
    }

    @Test
    public void PriceCalculation_OBJECT_NO_NULL() throws Exception {
        PricingOptionsDto pricingOptionsDto=new PricingOptionsDto();
        Assert.assertNotNull(pricingOptionsDto);
    }

    @Test
    public void PriceCalculation_COST_OF_SMALL_ROOMS_NO_NULL() throws Exception {
        PricingOptionsDto pricingOptionsDto=new PricingOptionsDto();
        pricingOptionsDto.setCostOfCleaningSmallRooms(new BigDecimal(20));
        Assert.assertNotNull(pricingOptionsDto.getCostOfCleaningSmallRooms());
    }

    @Test
    public void PriceCalculation_COST_OF_BIG_ROOMS_NO_NULL() throws Exception {
        PricingOptionsDto pricingOptionsDto=new PricingOptionsDto();
        pricingOptionsDto.setCostOfCleaningBigRooms(new BigDecimal(20));
        Assert.assertNotNull(pricingOptionsDto.getCostOfCleaningBigRooms());
    }

    @Test
    public void PriceCalculation_COST_OF_BATHROOM_NO_NULL() throws Exception {
        PricingOptionsDto pricingOptionsDto=new PricingOptionsDto();
        pricingOptionsDto.setCostOfCleaningBathrooms(new BigDecimal(20));
        Assert.assertNotNull(pricingOptionsDto.getCostOfCleaningBathrooms());
    }

}