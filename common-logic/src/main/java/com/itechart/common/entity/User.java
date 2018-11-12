package com.itechart.common.entity;

import lombok.*;
import org.springframework.stereotype.Component;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;


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

    @Size(min=2, max=50)
    @Column(name = "username")
    private String username;


    @Size(min=6, max=20)
    @Column(name = "password")
    private String password;

    @Size(min=6, max=30)
    @Column(name = "email")
    private String email;

    @Size(min=6, max=20)
    @Column(name = "phone")
    private String phone;

    @Column(name = "banned", nullable = false)
    private Boolean banned = Boolean.FALSE;
    @Column(name = "banReason")
    private String banReason;
    @Column(name = "address")
    private String address;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;
}
