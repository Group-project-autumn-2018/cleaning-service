package com.itechart.service.service.impl;

import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import com.itechart.service.mapper.OrderMapper;
import com.itechart.service.repository.OrderRepository;
import com.itechart.service.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private OrderMapper mapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    @Override
    public Page<OrderDto> findPaginated(int page, int size) {
        Page<Order> orders = orderRepository.findAll(PageRequest.of(page, size, Sort.by("id")));
        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    @Override
    public OrderDto getOne(Long id) {
        Order order;
        try {
            order = orderRepository.getOne(id);
            return mapper.mapOrderToOrderDto(order);
        } catch (EntityNotFoundException ex) {
            logger.warn("Entity order not found");
            return null;
        }
    }

    @Override
    public void saveOrder(OrderDto orderDto) {
        orderRepository.save(mapper.mapOrderDtoToOrder(orderDto));
    }

    @Override
    public void changeStatus(String status, Long id) {
        orderRepository.changeStatus(status,id);
    }
}
