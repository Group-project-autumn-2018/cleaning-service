package com.itechart.customer.entity;

import com.itechart.common.entity.User;
import lombok.Getter;
import lombok.Setter;
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
}
