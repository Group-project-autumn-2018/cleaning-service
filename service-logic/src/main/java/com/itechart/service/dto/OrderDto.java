package com.itechart.service.dto;
import com.itechart.service.entity.Duration;
import com.itechart.service.entity.Frequency;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;


@Getter
@Setter
public class OrderDto {

    private Long id;

    private Long companyId;

    private Long customerId;

    private String address;

    private String email;

    private String cleaningType;

    private Integer smallRoomsCount;

    private Integer bigRoomsCount;

    private Integer bathroomsCount;

    private LocalDate cleaningDay;

    private String cleaningTime;

    private Frequency frequency;

    private Duration duration;

    private LocalTime estimatedTime;

    private BigDecimal price;
}
