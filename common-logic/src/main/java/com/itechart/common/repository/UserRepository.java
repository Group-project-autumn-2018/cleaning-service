package com.itechart.common.repository;

import com.itechart.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByPhone(String phone);

    User findByUsername(String username);
}
