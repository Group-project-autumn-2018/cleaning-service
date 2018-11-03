package com.itechart.cleaning.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Component
@Table(name = "services")
@Inheritance(strategy = InheritanceType.JOINED)
public class Cleaning implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "label")
    private String label;
    @Column(name = "email")
    private String email;
    @Column(name = "banned", nullable = false)
    private Boolean banned = Boolean.FALSE;
    @Column(name = "banReason")
    private String banReason;

    public Cleaning() {
    }

    public Cleaning(String label, String email, Boolean banned, String banReason) {
        this.label = label;
        this.email = email;
        this.banned = banned;
        this.banReason = banReason;
    }
}
