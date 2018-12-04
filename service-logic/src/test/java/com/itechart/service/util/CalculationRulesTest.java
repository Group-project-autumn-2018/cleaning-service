package com.itechart.service.util;

public class CalculationRulesTest {
//
//    private CalculationRules calculationRules;
//    private static final double DELTA = 1e-15;
//
//    @Before
//    public void initTest() {
//        calculationRules = new CalculationRules();
//    }
//
//    @After
//    public void afterTest() {
//        calculationRules = null;
//    }
//
//    @Test
//    public void PriceCalculation() {
//        OrderDto OrderDto = new OrderDto();
//        OrderDto.setCoefficient(1);
//        OrderDto.setNumberOfSmallRooms(2);
//        OrderDto.setCostOfCleaningSmallRooms(new BigDecimal(15));
//        OrderDto.setNumberOfBigRooms(2);
//        OrderDto.setCostOfCleaningBigRooms(new BigDecimal(30));
//        OrderDto.setNumberOfBathrooms(3);
//        OrderDto.setCostOfCleaningBathrooms(new BigDecimal(31));
//        assertEquals(new BigDecimal(183), CalculationRules.PriceCalculation(OrderDto));
//    }
//
//    @Test
//    public void PriceCalculation1() {
//        OrderDto OrderDto = new OrderDto();
//        OrderDto.setCoefficient(1);
//        OrderDto.setNumberOfSmallRooms(2);
//        OrderDto.setCostOfCleaningSmallRooms(new BigDecimal(23.25));
//        OrderDto.setNumberOfBigRooms(2);
//        OrderDto.setCostOfCleaningBigRooms(new BigDecimal(30));
//        OrderDto.setNumberOfBathrooms(3);
//        OrderDto.setCostOfCleaningBathrooms(new BigDecimal(23.25));
//        assertEquals(new BigDecimal(176.25), CalculationRules.PriceCalculation(OrderDto));
//    }
//
//    @Test
//    public void PriceCalculation3() {
//        OrderDto OrderDto = new OrderDto();
//        OrderDto.setCoefficient(1);
//        OrderDto.setNumberOfSmallRooms(2);
//        OrderDto.setCostOfCleaningSmallRooms(new BigDecimal(25));
//        OrderDto.setNumberOfBigRooms(2);
//        OrderDto.setCostOfCleaningBigRooms(new BigDecimal(28));
//        OrderDto.setNumberOfBathrooms(3);
//        OrderDto.setCostOfCleaningBathrooms(new BigDecimal(30));
//        assertEquals(new BigDecimal(196), CalculationRules.PriceCalculation(OrderDto));
//    }
//
//    @Test
//    public void PriceCalculation_OBJECT_NO_NULL() {
//        OrderDto OrderDto = new OrderDto();
//        Assert.assertNotNull(OrderDto);
//    }
//
//    @Test
//    public void PriceCalculation_COST_OF_SMALL_ROOMS_NO_NULL() {
//        OrderDto OrderDto = new OrderDto();
//        OrderDto.setCostOfCleaningSmallRooms(new BigDecimal(20));
//        Assert.assertNotNull(OrderDto.getCostOfCleaningSmallRooms());
//    }
//
//    @Test
//    public void PriceCalculation_COST_OF_BIG_ROOMS_NO_NULL() {
//        OrderDto OrderDto = new OrderDto();
//        OrderDto.setCostOfCleaningBigRooms(new BigDecimal(20));
//        Assert.assertNotNull(OrderDto.getCostOfCleaningBigRooms());
//    }
//
//    @Test
//    public void PriceCalculation_COST_OF_BATHROOM_NO_NULL() {
//        OrderDto OrderDto = new OrderDto();
//        OrderDto.setCostOfCleaningBathrooms(new BigDecimal(20));
//        Assert.assertNotNull(OrderDto.getCostOfCleaningBathrooms());
//    }
//
//    @Test
//    public void CountingTime() {
//        TimingOptionsDto timingOptionsDto = new TimingOptionsDto();
//        timingOptionsDto.setCoefficient(1);
//        timingOptionsDto.setNumberOfBathrooms(2);
//        timingOptionsDto.setTimeOfCleaningBathrooms(20);
//        timingOptionsDto.setNumberOfBigRooms(3);
//        timingOptionsDto.setTimeOfCleaningBigRooms(30);
//        timingOptionsDto.setNumberOfSmallRooms(3);
//        timingOptionsDto.setTimeOfCleaningSmallRooms(10);
//        assertEquals(160, CalculationRules.CountingTime(timingOptionsDto), DELTA);
//    }
//
//    @Test
//    public void CountingTime1() {
//        TimingOptionsDto timingOptionsDto = new TimingOptionsDto();
//        timingOptionsDto.setCoefficient(1.5);
//        timingOptionsDto.setNumberOfBathrooms(2);
//        timingOptionsDto.setTimeOfCleaningBathrooms(20);
//        timingOptionsDto.setNumberOfBigRooms(3);
//        timingOptionsDto.setTimeOfCleaningBigRooms(30);
//        timingOptionsDto.setNumberOfSmallRooms(3);
//        timingOptionsDto.setTimeOfCleaningSmallRooms(10);
//        assertEquals(240, CalculationRules.CountingTime(timingOptionsDto), DELTA);
//    }
//
//    @Test
//    public void CountingTime1_OBJECT_NO_NULL() {
//        TimingOptionsDto timingOptionsDto = new TimingOptionsDto();
//        Assert.assertNotNull(timingOptionsDto);
//    }

}