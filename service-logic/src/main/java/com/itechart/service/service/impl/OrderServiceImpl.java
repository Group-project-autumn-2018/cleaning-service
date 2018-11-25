package com.itechart.service.service.impl;

import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import com.itechart.service.mapper.OrderMapper;
import com.itechart.service.repository.OrderRepository;
import com.itechart.service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

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
        return mapper.mapOrderToOrderDto(orderRepository.getOne(id));
    }

    @Override
    public void saveOrder(OrderDto orderDto) {
        Order order = mapper.mapOrderDtoToOrder(orderDto);
        orderRepository.save(order);
    }
}
