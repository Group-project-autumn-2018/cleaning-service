package com.itechart.service.entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Component
@Table(name = "prices")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "base_price")
    private BigDecimal basePrice;
    @Column(name = "standard_room_cleaning")
    private double standardRoomCleaning;
    @Column(name = "spring_cleaning")
    private double springCleaning;
    @Column(name = "repair_and_construction_cleaning")
    private double repairAndConstructionCleaning;
    @Column(name = "dry_carpet_cleaning")
    private double dryCarpetCleaning;
    @Column(name = "office_cleaning")
    private double officeCleaning;
    @Column(name = "furniture_and_coatings_cleaning")
    private double furnitureAndCoatingsCleaning;
    @Column(name = "industrial_cleaning")
    private double industrialCleaning;
    @Column(name = "pool_cleaning")
    private double poolCleaning;
    @Column(name = "small_room")
    private BigDecimal smallRoom;
    @Column(name = "big_room")
    private BigDecimal bigRoom;
    @Column(name = "bathroom")
    private BigDecimal bathroom;

    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "price")
    private TypesOfProvidedService typesOfProvidedService;

}