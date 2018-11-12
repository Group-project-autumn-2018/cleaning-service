package com.itechart.customer.repository;

import com.itechart.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Modifying
    @Query("update Customer set confirmed = :confirmed where id = :customerId")
    void changeConfirmStatus(@Param("confirmed") boolean confirmed, @Param("customerId") Long customerId);
}
