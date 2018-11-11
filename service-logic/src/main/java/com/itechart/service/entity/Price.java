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
    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
    private CleaningCompany company;
    @Column(name = "small_room")
    private BigDecimal smallRoom;
    @Column(name = "big_room")
    private BigDecimal bigRoom;
    @Column(name = "bathroom")
    private BigDecimal bathroom;

}