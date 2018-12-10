package com.itechart.service.service.impl;

import com.itechart.common.service.EmailService;
import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import com.itechart.service.entity.Status;
import com.itechart.service.mapper.OrderMapper;
import com.itechart.service.repository.OrderRepository;
import com.itechart.service.service.impl.OrderServiceImpl;
import com.itechart.web.CleaningServiceApplication;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityNotFoundException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
//@RunWith(SpringRunner.class)
@RunWith(MockitoJUnitRunner.class)
public class OrderServiceImplTest {

    @InjectMocks
    private OrderServiceImpl orderService;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderMapper mapper;

    @Mock
    private EmailService emailService;

    @Mock
    private SimpMessagingTemplate simpMessagingTemplate;

    @Mock
    Logger logger;

    private OrderDto orderDto;
    private Order order;

    @Before
    public void init() {
        orderDto = new OrderDto();
        order = new Order();
    }

    @Test
    public void changeStatusTest() throws Exception {
        String status = "NEW";
        Long id = 1L;
        String email = "mail@mail.com";
        order.setEmail(email);
        Mockito.when(orderRepository.getOne(id)).thenReturn(order);
        orderService.changeStatus(status, id);
        verify(emailService, times(1))
                .sendSimpleMessage(
                        ArgumentMatchers.eq(email),
                        ArgumentMatchers.contains("Order " + status),
                        ArgumentMatchers.eq("You order was " + status)
                );
        verify(orderRepository, times(1)).changeStatus(Status.NEW, id);
    }

    @Test
    public void testSendMessageToClient() {
        String serviceName = "mail@mail.com";
        Long orderId = 1L;
        orderService.sendMessageToClient(serviceName, orderId);
        verify(simpMessagingTemplate, times(1))
                .convertAndSendToUser(serviceName, "/queue/reply", orderId);
    }

    @Test
    public void testGetOne() {
        when(orderRepository.getOne(1L)).thenReturn(order);
        when(orderRepository.getOne(2L)).thenThrow(EntityNotFoundException.class);
        when(mapper.mapOrderToOrderDto(order)).thenReturn(new OrderDto());

        OrderDto orderDtoNotNull = orderService.getOne(1L);
        OrderDto orderDtoNull = orderService.getOne(2L);
        Assert.assertNotNull(orderDtoNotNull);
        Assert.assertNull(orderDtoNull);

    }

    @Test
    public void testFindPaginatedWithId() {
        List<Order> orderList = Collections.nCopies(3, new Order());
        Page<Order> orderPage = new PageImpl<>(orderList);
        Pageable pageable = PageRequest.of(0, 3);
        when(orderRepository.findAllByCustomer_Id(PageRequest.of(0, 3), 1L))
                .thenReturn(orderPage);
        orderService.findPaginatedWithId(1L, pageable);
        verify(mapper, times(3)).mapOrderToOrderDto(orderPage.getContent().get(0));
    }

}