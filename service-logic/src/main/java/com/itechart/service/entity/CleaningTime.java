package com.itechart.service.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Component
@Table(name = "cleaning_time")
public class CleaningTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "standard_room_cleaning_time")
    private int standardRoomCleaningTime;
    @Column(name = "spring_cleaning_time")
    private int springCleaningTime;
    @Column(name = "repair_and_construction_cleaning_time")
    private int repairAndConstructionCleaningTime;
    @Column(name = "dry_carpet_cleaning_time")
    private int dryCarpetCleaningTime;
    @Column(name = "office_cleaning_time")
    private int officeCleaningTime;
    @Column(name = "furniture_and_coatings_cleaning_time")
    private int furnitureAndCoatingsCleaningTime;
    @Column(name = "industrial_cleaning_time")
    private int industrialCleaningTime;
    @Column(name = "pool_cleaning_time")
    private int poolCleaningTime;
    @Column(name = "small_room_cleaning_time")
    private int smallRoomCleaningTime;
    @Column(name = "big_room_cleaning_time")
    private int bigRoomCleaningTime;
    @Column(name = "bathroom_cleaning_time")
    private int bathroomCleaningTime;

    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "cleaningTime")
    private TypesOfProvidedService typesOfProvidedService;
}
