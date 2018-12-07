package com.itechart.service.service.impl;

import com.itechart.common.service.EmailService;
import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import com.itechart.service.entity.Status;
import com.itechart.service.mapper.OrderMapper;
import com.itechart.service.repository.OrderRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@SpringBootTest
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
        Mockito.verify(emailService, Mockito.times(1))
                .sendSimpleMessage(
                        ArgumentMatchers.eq(email),
                        ArgumentMatchers.contains("Order " + status),
                        ArgumentMatchers.eq("You order was " + status)
                );
        Mockito.verify(orderRepository, Mockito.times(1)).changeStatus(Status.NEW, id);
    }

    @Test
    public void testSendMessageToClient() {
        String serviceName = "mail@mail.com";
        Long orderId = 1L;
        orderService.sendMessageToClient(serviceName, orderId);
        Mockito.verify(simpMessagingTemplate, Mockito.times(1))
                .convertAndSendToUser(serviceName, "/queue/reply", orderId);
    }

//    @Test
//    public void checkOrderStatusTest() throws Exception {
//
//        Mockito.when(mapper.mapOrderDtoToOrder(orderDto)).thenReturn(new Order());
//        Mockito.when(orderRepository.saveAndFlush(mapper.mapOrderDtoToOrder(orderDto)));
//
//        orderService.saveOrder(orderDto);
//        Mockito.verify(mapper, Mockito.times(1)).mapOrderDtoToOrder(orderDto);
//
//    }

}