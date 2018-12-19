package com.itechart.service.mapper;

import com.itechart.common.entity.Address;
import com.itechart.customer.entity.Customer;
import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.*;
import com.itechart.web.CleaningServiceApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;

import static org.junit.Assert.*;

@SpringBootTest(classes = CleaningServiceApplication.class)
@RunWith(SpringRunner.class)
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
public class OrderMapperTest {


    private Order order;
    private OrderDto orderDto;

    @Autowired
    private OrderMapper mapper;

    @Before
    public void init() {
        order = new Order();
        orderDto = new OrderDto();
        orderDto.setCompany(1L);
        orderDto.setBathroomsCount(1);
        orderDto.setBigRoomsCount(2);
        orderDto.setSmallRoomsCount(3);
        orderDto.setCleaningType("cleaning");
        orderDto.setEmail("order@mail.com");
        orderDto.setDuration(Duration.ONE_MONTH);
        orderDto.setFrequency(Frequency.ONLY_ONCE);
        orderDto.setPrice(BigDecimal.valueOf(100L));
        orderDto.setEstimatedTime(120);

        Address address = new Address();
        address.setAddress("Minsk");
        address.setLat(55.55);
        address.setLon(44.44);
        orderDto.setAddress(address);

        CleaningCompany cleaningCompany = new CleaningCompany();
        cleaningCompany.setId(1L);

        order.setAddress(address);
        order.setCompany(cleaningCompany);
        order.setBathroomsCount(1);
        order.setBigRoomsCount(2);
        order.setSmallRoomsCount(3);
        order.setCleaningType("cleaning");
        order.setEmail("order@mail.com");
        order.setDuration(Duration.ONE_MONTH);
        order.setFrequency(Frequency.ONLY_ONCE);
        order.setPrice(BigDecimal.valueOf(100L));
        order.setEstimatedTime(120);
        order.setAddress(address);
    }

    @Test
    public void setCustomerNullIfCustomerUnregistered() {
        Order result = mapper.mapOrderDtoToOrder(orderDto);
        orderDto.setCustomer(2L);
        Order resultWithCustomer = mapper.mapOrderDtoToOrder(orderDto);
        assertNull(result.getCustomer());
        assertNotNull(resultWithCustomer.getCustomer());
    }

    @Test
    public void mapOrderToOrderDto() {
        Customer customer = new Customer();
        customer.setId(2L);
        order.setCustomer(customer);
        OrderDto result = mapper.mapOrderToOrderDto(order);
        assertEquals(result.getCompany(), order.getCompany().getId());
        assertEquals(result.getAddress().getAddress(), order.getAddress().getAddress());
        assertEquals(result.getBathroomsCount(), order.getBathroomsCount());
        assertEquals(result.getDuration(), order.getDuration());
        assertEquals(result.getCompanyName(), order.getCompany().getUsername());
        assertEquals(result.getCustomer(), order.getCustomer().getId());
        assertEquals(result.getFrequency(), order.getFrequency());
    }

    @Test
    public void mapOrderDtoToOrder() {
        orderDto.setCustomer(2L);
        Order result = mapper.mapOrderDtoToOrder(orderDto);
        assertEquals(result.getCustomer().getId(), orderDto.getCustomer());
        assertEquals(result.getAddress().getAddress(), orderDto.getAddress().getAddress());
        assertEquals(result.getCompany().getId(), orderDto.getCompany());
        assertEquals(result.getStatus(), Status.NEW);
        assertEquals(result.getBathroomsCount(), orderDto.getBathroomsCount());
        assertEquals(result.getPrice(), orderDto.getPrice());
        assertEquals(result.getBigRoomsCount(), orderDto.getBigRoomsCount());
        assertEquals(result.getEstimatedTime(), orderDto.getEstimatedTime());
        assertEquals(result.getEmail(), orderDto.getEmail());
    }

}