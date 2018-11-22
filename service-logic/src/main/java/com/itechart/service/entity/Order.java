package com.itechart.service.entity;

import com.itechart.common.entity.Address;
import com.itechart.customer.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Component
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "id", nullable = false)
    private CleaningCompany company;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = true)
    private Customer customer;

    @Embedded
    private Address address;

    @Column(name = "unregistered_customer_email", nullable = true)
    private String email;

    @Column(name = "cleaning_type")
    private String cleaningType;

    @Column(name = "small_rooms_count")
    private Integer smallRoomsCount;

    @Column(name = "big_rooms_count")
    private Integer bigRoomsCount;

    @Column(name = "bathrooms_count")
    private Integer bathroomsCount;

    @Column(name = "cleaning_day")
    private LocalDate cleaningDay;

    @Column(name = "cleaning_time")
    private String cleaningTime;

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    @Enumerated(EnumType.STRING)
    private Duration duration;

    @Column(name = "estimated_time")
    private LocalTime estimatedTime;

    private BigDecimal price;

}
