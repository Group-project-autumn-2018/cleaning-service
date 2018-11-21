package com.itechart.service.service;

import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import org.springframework.data.domain.Page;

public interface OrderService {

    Page<OrderDto> findPaginated(int page, int size);

    OrderDto getOne(Long id);

    void saveOrder(OrderDto orderDto);
}
