package com.itechart.service.entity;

import com.itechart.common.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Component
@Table(name = "services")
@PrimaryKeyJoinColumn(name = "id")
public class CleaningCompany extends User {
    @Column(name = "description")
    private String description;

    @Column(name = "confirmed")
    private Boolean confirmed;


    @OneToOne
    @PrimaryKeyJoinColumn
    private CleaningTypes cleaningTypes;
}
