package com.itechart.web.controller;
import com.itechart.service.dto.OrderDto;
import com.itechart.service.service.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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
    public Page<OrderDto> getOrders(@RequestParam(value = "search", required = false) String search,
                                    @RequestParam(value = "userID", required = false) Long id,
                                    Pageable pageable) {
        if (search != null && id != null) {
            return orderService.findPaginatedWithSearchAndId(id, search, pageable);
        } else if (id != null) {
            return orderService.findPaginatedWithId(id, pageable);
        } else if (search != null) {
            return orderService.findPaginatedWithSearch(search, pageable);
        }
        return orderService.findPaginated(pageable);
    }


    @PostMapping
    public void saveOrder(@RequestBody OrderDto orderDto) {
        orderService.saveOrder(orderDto);
    }

    @GetMapping("/test")
    public void testNo(Principal principal) {
        orderService.sendMessageToClient(principal.getName(), 5L);
    }
}
