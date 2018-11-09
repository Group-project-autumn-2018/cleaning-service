package com.itechart.cleaning.repository;

import com.itechart.cleaning.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Long countRatingByServiceIdAndCustomerId(Long serviceId, Long customerId);
}
