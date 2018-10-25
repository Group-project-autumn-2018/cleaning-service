package com.itechart.common.entity;

import lombok.*;
import org.springframework.stereotype.Component;
import javax.persistence.*;
import java.io.Serializable;


@Getter
@Setter
@Entity
@Component
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "banned", nullable = false)
    private Boolean banned = Boolean.FALSE;
    @Column(name = "banReason")
    private String banReason;
    @Column(name = "address")
    private String address;

    public User(String username, String password, String email, String phone, Boolean banned, String banReason, String address) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.banned = banned;
        this.banReason = banReason;
        this.address = address;
    }

    public User() {
    }
}
