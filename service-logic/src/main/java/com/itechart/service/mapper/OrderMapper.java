package com.itechart.service.mapper;

import com.itechart.service.dto.OrderDto;
import com.itechart.service.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class OrderMapper {

    @Mapping(target = "company", source = "company.id")
    @Mapping(target = "customer", source = "customer.id")
    @Mapping(target = "address", source = "address.address")
    public abstract OrderDto mapOrderToOrderDto(Order order);

    @Mapping(target = "address.address", source = "address")
    @Mapping(target = "company.id", source = "company")
    @Mapping(target = "customer.id", source = "customer")
    public abstract Order mapOrderDtoToOrder(OrderDto orderDto);
}
