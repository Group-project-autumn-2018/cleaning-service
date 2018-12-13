package com.itechart.service.service;
import com.itechart.service.dto.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface OrderService {

    OrderDto getOne(Long id);

    void saveOrder(OrderDto orderDto);

    Page<OrderDto> findPaginated(Pageable pageable);

    Page<OrderDto> findPaginatedWithId(Long id, Pageable pageable);

    Page<OrderDto> findPaginatedWithServiceId(Long id, Pageable pageable);

    Page<OrderDto> findPaginatedWithSearch(String search, Pageable pageable);

    Page<OrderDto> findPaginatedWithSearchAndId(Long id, String search, Pageable pageable);

    Page<OrderDto> findPaginatedWithCleaningTypeAndStatus(Long id, String cleaningType, String status, Pageable pageable);

    Page<OrderDto> findPaginatedWithCleaningType (Long id, String cleaningType, Pageable pageable);

    Page<OrderDto> findPaginatedWithStatus (Long id, String status, Pageable pageable);

    int getNumberOfOrdersByType (Long id, String cleaningType );

    int getNumberOfOrdersByStatus (Long id, String status);

    int getNumberOfOrdersByFrequency(Long id, String duration);


}
