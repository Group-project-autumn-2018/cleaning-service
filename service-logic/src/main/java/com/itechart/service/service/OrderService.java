package com.itechart.service.service;
import com.itechart.service.dto.OrderDto;
import org.springframework.data.domain.Page;
import com.querydsl.core.types.Predicate;

public interface OrderService {

    Page<OrderDto> findPaginated(int page, int size, Long id);

    OrderDto getOne(Long id);

    void saveOrder(OrderDto orderDto);
}
