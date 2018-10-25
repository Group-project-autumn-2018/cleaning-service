package com.itechart.customer.entity;

import com.itechart.common.entity.User;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;


@Getter
@Setter
@Entity
@Component
@Table(name = "customers")
@PrimaryKeyJoinColumn(name = "id")
public class Customer extends User {
    @Column(name = "confirmed")
    private Boolean confirmed;
    @Column(name = "cleaning_notifications")
    private Boolean cleaningNotifications;



    public Customer(String name, String password, String email, String phone, Boolean banned, String banReason, String address, Boolean confirmed, Boolean cleaningNotifications) {
        super(name, password, email, phone, banned, banReason, address);
        this.cleaningNotifications = cleaningNotifications;
        this.confirmed = confirmed;
    }

    public Customer() {
    }
}
