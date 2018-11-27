package com.itechart.web.controller;

import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import com.itechart.service.service.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.web.bind.annotation.*;
import com.querydsl.core.types.Predicate;

@RestController
@RequestMapping("api/order")
public class OrderController {


    private final OrderServiceImpl orderService;

    @Autowired
    public OrderController(OrderServiceImpl orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable Long id) {
        return orderService.getOne(id);
    }


    @GetMapping
    public Page<OrderDto> getOrders(@RequestParam("page") int page,
                                    @RequestParam("size") int size,
                                    @RequestParam(value = "userID", required = false) Long id) {
        return orderService.findPaginated(page, size, id);

    }

    @PostMapping
    public void saveOrder(@RequestBody OrderDto orderDto) {
        orderService.saveOrder(orderDto);
    }
}
