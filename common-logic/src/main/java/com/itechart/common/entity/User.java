package com.itechart.common.entity;

import lombok.*;
import org.springframework.stereotype.Component;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Getter
@Setter
@Entity
@Component
@AllArgsConstructor
@NoArgsConstructor
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
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;
}
