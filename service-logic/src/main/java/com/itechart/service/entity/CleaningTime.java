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
@Table(name = "cleaning_time")
public class CleaningTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
    private CleaningCompany company;
    @Column(name = "small_room_cleaning_time")
    private int smallRoomCleaningTime;
    @Column(name = "big_room_cleaning_time")
    private int bigRoomCleaningTime;
    @Column(name = "bathroom_cleaning_time")
    private int bathroomCleaningTime;
}
