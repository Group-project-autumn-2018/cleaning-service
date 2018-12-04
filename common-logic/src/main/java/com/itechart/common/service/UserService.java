package com.itechart.common.service;

import com.itechart.common.entity.User;

public interface UserService {
    User getCurrentUser();

    User findByEmail(String email);
}
