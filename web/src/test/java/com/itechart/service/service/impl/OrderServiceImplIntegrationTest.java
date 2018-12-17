package com.itechart.service.service.impl;

import com.itechart.common.service.EmailService;
import com.itechart.customer.entity.Customer;
import com.itechart.customer.repository.CustomerRepository;
import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Order;
import com.itechart.service.mapper.OrderMapper;
import com.itechart.service.repository.CleaningCompanyRepository;
import com.itechart.service.repository.OrderRepository;
import com.itechart.web.CleaningServiceApplication;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest(classes = CleaningServiceApplication.class)
@RunWith(SpringRunner.class)
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
public class OrderServiceImplIntegrationTest {

    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CleaningCompanyRepository cleaningCompanyRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderMapper mapper;

    @MockBean
    private EmailService emailService;

    @MockBean
    private SimpMessagingTemplate simpMessagingTemplate;

    @MockBean
    Logger logger;

    private Customer customer;
    private CleaningCompany service;
    private Pageable pageable;

    @Before
    public void init() {
        customer = new Customer();
        customer.setEmail("user@mail.com");
        customer.setUsername("John");
        customer.setId(1L);
        customerRepository.save(customer);
        service = new CleaningCompany();
        service.setEmail("service@mail.com");
        service.setUsername("service");
        service.setId(2L);
        cleaningCompanyRepository.save(service);
        orderRepository.deleteAll();
        for (int i = 0; i < 3; i++) {
            Order order = new Order();
            order.setCompany(service);
            order.setCustomer(customer);
            orderRepository.save(order);
        }
        pageable = PageRequest.of(0, 2);
    }

    @After
    public void clear() {
        orderRepository.deleteAll();
    }

    @Test
    public void testSaveOrder() {
        OrderDto orderDto = new OrderDto();
        orderDto.setCompany(2L);
        orderService.saveOrder(orderDto);
        CleaningCompany company = cleaningCompanyRepository.findById(2L).orElseThrow(EntityNotFoundException::new);
        String email = company.getEmail();
        verify(emailService, times(1))
                .sendSimpleMessage(
                        ArgumentMatchers.eq(email),
                        anyString(),
                        anyString()
                );
        List<Order> orders = orderRepository.findAllByCompany_Id(2L);
        Assert.assertNotNull(orders);
        Assert.assertEquals(4, orders.size());
    }

    @Test
    public void testFindPaginated() {
        Page<OrderDto> pages = orderService.findPaginated(pageable);
        Assert.assertEquals(2, pages.getSize());
        Assert.assertEquals(2, pages.getTotalPages());
        Assert.assertEquals(3, pages.getTotalElements());
    }


    @Test
    public void testFindPaginatedWithId() {
        Page<OrderDto> pages = orderService.findPaginatedWithId(1L, pageable);
        Page<OrderDto> pagesNull = orderService.findPaginatedWithId(2L, pageable);
        Assert.assertEquals(3, pages.getTotalElements());
        Assert.assertEquals(0, pagesNull.getTotalElements());
    }

    @Test
    public void testFindPaginatedWithSearchAndId() {
        Page<OrderDto> pages = orderService.findPaginatedWithSearchAndId(1L, "company:service", pageable);
        Page<OrderDto> pagesNull = orderService.findPaginatedWithSearchAndId(1L, "company:notexistingCompany", pageable);
        Assert.assertEquals(3, pages.getTotalElements());
        Assert.assertEquals(0, pagesNull.getTotalElements());
    }

    @Test
    public void testFindPaginatedWithSearch() {
        Page<OrderDto> pages = orderService.findPaginatedWithSearch("company:service", pageable);
        Page<OrderDto> pagesNull = orderService.findPaginatedWithSearch("company:notexistingCompany", pageable);
        Assert.assertEquals(3, pages.getTotalElements());
        Assert.assertEquals(0, pagesNull.getTotalElements());
    }

}
