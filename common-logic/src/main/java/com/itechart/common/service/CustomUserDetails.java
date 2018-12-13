package com.itechart.common.service;

import com.itechart.common.entity.Address;
import org.springframework.security.core.userdetails.UserDetails;


public interface CustomUserDetails extends UserDetails {

    String getName();
    Long getId();
    Address getAddress();
}
