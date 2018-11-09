package com.itechart.service.service.impl;

import com.itechart.common.entity.User;
import com.itechart.common.service.EmailService;
import com.itechart.common.service.UserService;
import com.itechart.customer.service.CustomerService;
import com.itechart.service.dto.RatingDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Rating;
import com.itechart.service.repository.RatingRepository;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final CleaningCompanyService companyService;
    private final EmailService emailService;
    private final UserService userService;
    private final CustomerService customerService;
    private static final String SUBJECT = "Someone left feedback ";

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository,
                             EmailService emailService,
                             CleaningCompanyService companyService,
                             UserService userService,
                             CustomerService customerService) {
        this.ratingRepository = ratingRepository;
        this.emailService = emailService;
        this.companyService = companyService;
        this.userService = userService;
        this.customerService = customerService;
    }

    @Override
    public Long addRating(RatingDto ratingDto) {
        User currentUser = userService.getCurrentUser();
        Long ratingCount = ratingRepository.countSameRatings(ratingDto.getServiceId(), currentUser.getId());
        if (ratingCount != 0) return 0L;
        CleaningCompany company = companyService.getOne(ratingDto.getServiceId());
        if (company != null) {
            String text = "Rating: " + ratingDto.getRate() + '\n' + ratingDto.getText();
            emailService.sendSimpleMessage(company.getEmail(), SUBJECT + LocalDate.now(), text);
        } else return 0L;
        Rating rating = new Rating();
        rating.setCustomer(customerService.getOne(currentUser.getId()));
        rating.setCompany(company);
        rating.setRate(ratingDto.getRate());
        rating.setText(ratingDto.getText());
        ratingRepository.saveAndFlush(rating);
        return rating.getId();
    }
}
