package com.itechart.service.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "company_service")
public class CompanyService {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "price_per_m2_$")
    private Integer price;

    @Basic
    @Column(name = "time_per_m2_minute")
    private Integer time;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
    private Company company;

    @OneToMany(mappedBy = "companyService", cascade = CascadeType.ALL)
    private List<ServiceCoefficient> serviceCoefficientList;
}
