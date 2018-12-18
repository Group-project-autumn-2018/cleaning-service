package com.itechart.service.service.impl;

import com.itechart.common.service.EmailService;
import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Frequency;
import com.itechart.service.entity.Order;
import com.itechart.service.entity.Status;
import com.itechart.service.mapper.OrderMapper;
import com.itechart.service.repository.CleaningCompanyRepository;
import com.itechart.service.repository.OrderRepository;
import com.itechart.service.service.OrderService;
import com.itechart.service.specification.OrderSpecificationsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OrderServiceImpl implements OrderService {

    private final EmailService emailService;

    private final OrderRepository orderRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final CleaningCompanyRepository cleaningCompanyRepository;

    private SimpMessagingTemplate simpMessagingTemplate;

    @Value("${order.check.delay}")
    private Long orderStatusCheckDelay;

    private final TaskScheduler taskScheduler;

    private final OrderMapper mapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, EmailService emailService,
                            CleaningCompanyRepository cleaningCompanyRepository, SimpMessagingTemplate simpMessagingTemplate,
                            OrderMapper mapper, TaskScheduler taskScheduler) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.cleaningCompanyRepository = cleaningCompanyRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.mapper = mapper;
        this.taskScheduler = taskScheduler;
    }

    @Override
    public Page<OrderDto> findPaginated(Pageable pageable) {

        Page<Order> orders = orderRepository.findAll(pageable);
        return orders.map(mapper::mapOrderToOrderDto);
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


    private void checkOrderStatus(Long id) {
        Order order = orderRepository.findById(id).get();
        if (order.getStatus() != Status.CONFIRMED) {
            order.setStatus(Status.REJECTED);
            orderRepository.saveAndFlush(order);
            logger.info("Order #" + id + " rejected by timeout");
        }

    }


    @Override
    public void saveOrder(OrderDto orderDto) {
        Order order = mapper.mapOrderDtoToOrder(orderDto);
        Order savedOrder = orderRepository.saveAndFlush(order);
        Long savedOrderId = savedOrder.getId();
        Long companyId = savedOrder.getCompany().getId();
        CleaningCompany company = cleaningCompanyRepository.findById(companyId).get();
        String companyEmail = company.getEmail();
        String subject = "New order №" + savedOrderId;
        String text = " You have a new order №" + savedOrderId + System.lineSeparator()
                + " http://localhost:8080/service/orders/" + savedOrderId;
        emailService.sendSimpleMessage(companyEmail, subject, text);
        setCheckOrderStatusDelay(savedOrderId);
        //todo remove delay
        Date sendMessageTime = new Date(new Date().getTime() + 30000);
        taskScheduler.schedule(
                () -> sendMessageToClient(companyEmail, savedOrderId),
                sendMessageTime);
        logger.info(companyEmail, savedOrderId);
    }


    private void setCheckOrderStatusDelay(Long savedOrderId) {
        Date checkOrderStatusTime = new Date(new Date().getTime() + orderStatusCheckDelay);
        taskScheduler.schedule(() -> checkOrderStatus(savedOrderId), checkOrderStatusTime);
    }


    public void sendMessageToClient(String serviceName, Long orderId) {
        simpMessagingTemplate.convertAndSendToUser(serviceName, "/queue/reply", orderId);
        logger.info("Notification sent to " + serviceName);
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
        return orders.map(mapper::mapOrderToOrderDto);
    }

    @Override
    public Page<OrderDto> findPaginatedWithId(Long id, Pageable pageable) {
        Page<Order> orders = orderRepository.findAllByCustomer_Id(pageable, id);
        return orders.map(mapper::mapOrderToOrderDto);
    }

    @Override
    public Page<OrderDto> findPaginatedWithSearch(String search, Pageable pageable) {

        OrderSpecificationsBuilder builder = getSpecificationBuilder(search);
        Specification<Order> spec = builder.build();
        Page<Order> orders = orderRepository.findAll(spec, pageable);
        return orders.map(mapper::mapOrderToOrderDto);
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

    @Override
    public Page<OrderDto> findPaginatedWithCleaningType(Long id, String cleaningType, Pageable pageable) {
        cleaningType = cleaningType.replace(" ", "-");
        Page<Order> orders = orderRepository.findAllByCompany_IdAndCleaningType( pageable, id, cleaningType);

        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    @Override
    public Page<OrderDto> findPaginatedWithStatus(Long id, String status, Pageable pageable) {

        Status currentStatus =Status.valueOf(status);
        Page<Order> orders = orderRepository.findAllByCompany_IdAndStatus(pageable, id, currentStatus);

        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    @Override
    public Page<OrderDto> findPaginatedWithCleaningTypeAndStatus(Long id, String cleaningType,String status ,Pageable pageable) {
        cleaningType = cleaningType.replace(" ", "-");
        Status currentStatus = Status.valueOf(status);
        Page<Order> orders = orderRepository.findAllByCompany_IdAndCleaningTypeAndStatus( pageable, id, cleaningType, currentStatus);

        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    @Override
    public Page<OrderDto> findPaginatedWithServiceId(Long id, Pageable pageable) {

        Page<Order> orders = orderRepository.findAllByCompany_Id(pageable, id);

        return orders.map(order -> mapper.mapOrderToOrderDto(order));
    }

    @Override
    public int[] getNumbersOfOrdersByType(Long id, String cleaningTypes){
        String[] types = cleaningTypes.split(";");

        int[] nums=new int[types.length];

        for(int i=0;i<types.length;i++){
            List<Order> orders=orderRepository.findAllByCompany_IdAndCleaningType(id, types[i]);
            nums[i]=orders.size();
        }

        return nums;
    }

    @Override
    public int[] getNumbersOfOrdersByStatus(Long id, String statuses){
       String[] arrayOfStatuses = statuses.split(";");

       int[] nums =new int[arrayOfStatuses.length];

       for(int i=0;i<arrayOfStatuses.length;i++){
           Status currentStatus=Status.valueOf((arrayOfStatuses[i]));
           List<Order> orders=orderRepository.findAllByCompany_IdAndStatus(id,currentStatus);
           nums[i]=orders.size();
       }

        return nums;
    }

    @Override
    public int[] getNumbersOfOrdersByFrequency (Long id, String frequences){
        String[] arrayOfFrequences = frequences.split(";");

        int[] nums=new int[arrayOfFrequences.length];

        for(int i=0;i<arrayOfFrequences.length;i++){
            Frequency currentFrequency=Frequency.valueOf(arrayOfFrequences[i]);
            List<Order> orders=orderRepository.findAllByCompany_IdAndFrequency(id,currentFrequency);
            nums[i]=orders.size();
        }

        return  nums;
    }



    @Transactional
    @Override
    public void changeStatus(String status, Long id) {
        Order order = orderRepository.getOne(id);

        Status currentStatus = Status.valueOf(status);
        emailService.sendSimpleMessage(order.getEmail(), "Order " + status + " " + LocalDate.now(),
                "You order was " + status);
        orderRepository.changeStatus(currentStatus, id);
    }
}
