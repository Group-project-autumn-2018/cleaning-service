package com.itechart.service.entity;

import com.itechart.customer.entity.Customer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Component
@Table(name = "ratings")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "service_id", referencedColumnName = "id", nullable = false)
//    private CleaningCompany company;

//    @ManyToOne
//    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
//    private Customer customer;

    @Column(name = "text")
    private String text;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "service_id")
    private Long serviceId;
}
