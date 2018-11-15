package com.itechart.service.repository;

import com.itechart.service.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Long countRatingsByServiceIdAndCustomerId(Long serviceId, Long customerId);
}
