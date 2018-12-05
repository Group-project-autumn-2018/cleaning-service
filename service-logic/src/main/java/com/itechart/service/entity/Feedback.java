package com.itechart.service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itechart.customer.entity.Customer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Component
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "id", nullable = false)
    private CleaningCompany company;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
    private Customer customer;

    @Column(name = "text")
    private String text;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "adding_date")
    private LocalDate addingDate;
}
