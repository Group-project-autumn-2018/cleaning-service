package com.itechart.service.repository;

import com.itechart.service.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query("select count(Rating) from Rating where customerId = :customerId and serviceId = :serviceId")
    Long countSameRatings(@Param("serviceId") Long serviceId, @Param("customerId") Long customerId);
}
