//package com.itechart.service.entity;
//
//import lombok.Getter;
//import lombok.Setter;
//import org.springframework.stereotype.Component;
//
//import javax.persistence.*;
//import java.math.BigDecimal;
//
//@Getter
//@Setter
//@Entity
//@Component
//@Table(name = "prices")
//public class Price {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @ManyToOne
//    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
//    private CleaningCompany company;
//    @Column(name = "base_price")
//    private BigDecimal basePrice;
//    @Column(name = "coefficient")
//    private BigDecimal coefficient;
//}
