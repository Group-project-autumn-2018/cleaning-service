package com.itechart.service.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Component
@Table(name = "types_of_provided_service")
public class TypesOfProvidedService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "price_id", referencedColumnName = "id")
    private Price price;

    @OneToOne
    @JoinColumn(name = "cleaning_time_id", referencedColumnName = "id")
    private CleaningTime cleaningTime;

    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "id", nullable = false)
    private CleaningCompany company;

    @Column(name = "standard_room_cleaning")
    private Boolean standardRoomCleaning;

    @Column(name = "spring_cleaning")
    private Boolean springCleaning;

    @Column(name = "repair_and_construction_cleaning")
    private Boolean repairAndConstructionCleaning;

    @Column(name = "dry_carpet_cleaning")
    private Boolean dryCarpetCleaning;

    @Column(name = "office_cleaning")
    private Boolean officeCleaning;

    @Column(name = "furniture_and_coatings_cleaning")
    private Boolean furnitureAndCoatingsCleaning;

    @Column(name = "industrial_cleaning")
    private Boolean industrialCleaning;

    @Column(name = "pool_cleaning")
    private Boolean poolCleaning;
}
