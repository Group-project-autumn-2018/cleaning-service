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

    @GetMapping("/service")
    public Page<OrderDto> getOrdersFromTableOfOrders(@RequestParam(value = "cleaningType", required = false) String cleaningType,
                                                     @RequestParam(value = "status", required = false) String status,
                                                     @RequestParam(value = "userID", required = false) Long id,
                                                     Pageable pageable) {

        if (cleaningType != null && status != null) {
            return orderService.findPaginatedWithCleaningTypeAndStatus(id, cleaningType, status, pageable);
        } else if (cleaningType != null && !cleaningType.equals("")) {
            return orderService.findPaginatedWithCleaningType(id, cleaningType, pageable);
        } else if (status != null && !status.equals("")) {
            return orderService.findPaginatedWithStatus(id, status, pageable);
        } else if (id != null) {
            return orderService.findPaginatedWithServiceId(id, pageable);
        }
        return orderService.findPaginated(pageable);
    }

    @GetMapping("/getNumber")
    public int[] getNumbersOfTypes(@RequestParam(value = "cleaningTypes", required = false) String cleaningTypes,
                                   @RequestParam(value = "statuses", required = false) String statuses,
                                   @RequestParam(value = "frequences", required = false) String frequences,
                                   @RequestParam(value = "userID", required = false) Long id) {
        int[] nums = new int[]{1, 2, 3, 4, 5, 6, 7};
        if (cleaningTypes != null) {
            nums = orderService.getNumbersOfOrdersByType(id, cleaningTypes);
        } else if (statuses != null) {
            nums = orderService.getNumbersOfOrdersByStatus(id, statuses);
        } else if (frequences != null) {
            nums = orderService.getNumbersOfOrdersByFrequency(id, frequences);
        }
        return nums;

    }

    @PostMapping
    public void saveOrder(@RequestBody OrderDto orderDto) {
        orderService.saveOrder(orderDto);
    }

    @PostMapping(value = "/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody String status) {
        orderService.changeStatus(status, id);
    }

    @GetMapping("/test")
    public void testNo(Principal principal) {
        orderService.sendMessageToClient(principal.getName(), 5L);
    }
}
