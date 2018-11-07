package com.itechart.service.service.impl;

import com.itechart.service.dto.RatingDto;
import com.itechart.service.entity.Rating;
import com.itechart.service.repository.RatingRepository;
import com.itechart.service.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public Long addRating(RatingDto ratingDto) {
        Long ratingCount =
                ratingRepository.countRatingsByServiceIdAndCustomerId(ratingDto.getServiceId(),
                                                                        ratingDto.getCustomerId());
        if (ratingCount != 0) return 0L;
        Rating rating = new Rating();
        rating.setCustomerId(ratingDto.getCustomerId());
        rating.setServiceId(ratingDto.getServiceId());
        rating.setRate(ratingDto.getRate());
        rating.setText(ratingDto.getText());
        ratingRepository.saveAndFlush(rating);
        return rating.getId();
    }
}
