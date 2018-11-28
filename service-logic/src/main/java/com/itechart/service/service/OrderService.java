package com.itechart.service.service;
import com.itechart.service.dto.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface OrderService {

    OrderDto getOne(Long id);

    void saveOrder(OrderDto orderDto);

    Page<OrderDto> findPaginated(Pageable pageable);

    Page<OrderDto> findPaginatedWithId(Long id, Pageable pageable);

    Page<OrderDto> findPaginatedWithSearch(String search, Pageable pageable);

    Page<OrderDto> findPaginatedWithSearchAndId(Long id, String search, Pageable pageable);
}
