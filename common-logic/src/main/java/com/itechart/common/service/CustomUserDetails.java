package com.itechart.common.service;

import org.springframework.security.core.userdetails.UserDetails;


public interface CustomUserDetails extends UserDetails {

    String getName();
    Long getId();
}
