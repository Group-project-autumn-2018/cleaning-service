package com.itechart.service.repository;

import com.itechart.service.entity.Order;
import com.itechart.service.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Modifying
    @Query("update Order set status = :status where id = :orderId")
    void changeStatus(@Param("status") Status status, @Param("orderId") Long orderId);
}
