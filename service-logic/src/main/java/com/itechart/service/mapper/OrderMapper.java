package com.itechart.service.mapper;

import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class OrderMapper {

    @Mapping(target = "companyId", source = "company.id")
    @Mapping(target = "customerId", source = "customer.id")
    @Mapping(target = "address", source = "address.address")
    public abstract OrderDto mapOrderToOrderDto(Order order);


    public abstract Order mapOrderDtoToOrder(OrderDto orderDto);
}
