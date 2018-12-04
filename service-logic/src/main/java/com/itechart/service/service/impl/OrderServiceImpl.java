package com.itechart.service.service.impl;

import com.itechart.common.service.EmailService;
import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Order;
import com.itechart.service.entity.Status;
import com.itechart.service.mapper.OrderMapper;
import com.itechart.service.repository.CleaningCompanyRepository;
import com.itechart.service.repository.OrderRepository;
import com.itechart.service.service.OrderService;
import com.itechart.service.specification.OrderSpecificationsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OrderServiceImpl implements OrderService {

    private final EmailService emailService;

    private final OrderRepository orderRepository;

    private final CleaningCompanyRepository cleaningCompanyRepository;

    @Value("${order.check.delay}")
    private Long orderStatusCheckDelay;

    @Autowired
    private TaskScheduler taskScheduler;

    @Autowired
    private OrderMapper mapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, EmailService emailService,
                            CleaningCompanyRepository cleaningCompanyRepository) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.cleaningCompanyRepository = cleaningCompanyRepository;

    }

    @Override
    public Page<OrderDto> findPaginated(Pageable pageable) {

        Page<Order> orders = orderRepository.findAll(pageable);
        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }


    @Override
    public OrderDto getOne(Long id) {
        return mapper.mapOrderToOrderDto(orderRepository.getOne(id));
    }


    private void checkOrderStatus(Long id) {
        Order order = orderRepository.findById(id).get();
        if (order.getStatus() != Status.CONFIRMED) {
            order.setStatus(Status.REJECTED);
            orderRepository.saveAndFlush(order);
        }
        System.out.println("task");
    }


    @Override
    public void saveOrder(OrderDto orderDto) {
        Order order = mapper.mapOrderDtoToOrder(orderDto);
        Order savedOrder = orderRepository.saveAndFlush(order);
        Long companyId = savedOrder.getCompany().getId();
        CleaningCompany company = cleaningCompanyRepository.findById(companyId).get();
        String subject = "New order №" + savedOrder.getId();
        String text = " You have new order №" + savedOrder.getId();
        emailService.sendSimpleMessage(company.getEmail(), subject, text);

        Date date = new Date(new Date().getTime() + orderStatusCheckDelay);
        taskScheduler.schedule(() -> checkOrderStatus(savedOrder.getId()), date);
    }

    @Bean
    TaskScheduler taskScheduler() {
        return new ConcurrentTaskScheduler();
    }


    @Override
    public Page<OrderDto> findPaginatedWithSearchAndId(Long id, String search, Pageable pageable) {

        OrderSpecificationsBuilder builder = getSpecificationBuilder(search);
        builder.with("customer", id);
        Specification<Order> spec = builder.build();
        Page<Order> orders = orderRepository.findAll(spec, pageable);

        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    @Override
    public Page<OrderDto> findPaginatedWithId(Long id, Pageable pageable) {

        Page<Order> orders = orderRepository.findAllByCustomer_Id(pageable, id);

        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    @Override
    public Page<OrderDto> findPaginatedWithSearch(String search, Pageable pageable) {

        OrderSpecificationsBuilder builder = getSpecificationBuilder(search);
        Specification<Order> spec = builder.build();
        Page<Order> orders = orderRepository.findAll(spec, pageable);

        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    private OrderSpecificationsBuilder getSpecificationBuilder(String search) {
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),");
        Matcher matcher = pattern.matcher(search + ",");
        OrderSpecificationsBuilder builder = new OrderSpecificationsBuilder();

        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
        }
        return builder;
    }
}
