package com.itechart.common.service;

import com.itechart.common.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getRoles();

    Role getRole(String name);
}
