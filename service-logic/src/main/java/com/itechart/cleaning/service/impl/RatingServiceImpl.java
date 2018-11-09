//package com.itechart.cleaning.service.impl;
//
//import com.itechart.cleaning.entity.Rating;
//import com.itechart.cleaning.repository.RatingRepository;
//import com.itechart.cleaning.service.RatingService;
//
//public class RatingServiceImpl implements RatingService {
//
//    private final RatingRepository ratingRepository;
//
//    public RatingServiceImpl(RatingRepository ratingRepository) {
//        this.ratingRepository = ratingRepository;
//    }
//
//    @Override
//    public Long addRating(RatingDto ratingDto) {
//        Long ratingCount =
//        ratingRepository.countRatingByServiceIdAndCustomerId(ratingDto.getServiceId(), ratingDto.getCustomerId());
//        if (ratingCount != 0) return 0L;
//        Rating rating = new Rating();
//        rating.setCustomerId.
//    }
//}
