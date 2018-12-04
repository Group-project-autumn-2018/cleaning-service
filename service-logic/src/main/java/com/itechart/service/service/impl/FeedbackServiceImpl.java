package com.itechart.service.service.impl;

import com.itechart.common.entity.User;
import com.itechart.common.service.EmailService;
import com.itechart.common.service.UserService;
import com.itechart.customer.service.CustomerService;
import com.itechart.service.dto.FeedbackDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Feedback;
import com.itechart.service.repository.FeedbackRepository;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final CleaningCompanyService companyService;
    private final EmailService emailService;
    private final UserService userService;
    private final CustomerService customerService;
    private static final String SUBJECT = "Someone left feedback ";

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository,
                               EmailService emailService,
                               CleaningCompanyService companyService,
                               UserService userService,
                               CustomerService customerService) {
        this.feedbackRepository = feedbackRepository;
        this.emailService = emailService;
        this.companyService = companyService;
        this.userService = userService;
        this.customerService = customerService;
    }

    @Override
    public Long addFeedback(FeedbackDto feedbackDto) {
        User currentUser = userService.getCurrentUser();
        Long ratingCount = feedbackRepository.countSameRatings(feedbackDto.getServiceId(), currentUser.getId());
        if (ratingCount != 0) return 0L;
        CleaningCompany company = companyService.getOne(feedbackDto.getServiceId());
        if (company != null) {
            String text = "Rating: " + feedbackDto.getRate() + '\n' + feedbackDto.getText();
            emailService.sendSimpleMessage(company.getEmail(), SUBJECT + LocalDate.now(), text);
        } else return 0L;
        Feedback feedback = new Feedback();
        feedback.setCustomer(customerService.getCustomerById(currentUser.getId()));
        feedback.setCompany(company);
        feedback.setAddingDate(LocalDate.now());
        feedback.setRate(feedbackDto.getRate());
        feedback.setText(feedbackDto.getText());
        feedbackRepository.saveAndFlush(feedback);
        return feedback.getId();
    }

    @Override
    public List<Feedback> getAll(Long serviceId) {
        CleaningCompany company = companyService.getOne(serviceId);
        if (company != null) {
            return feedbackRepository.findAllByCompanyOrderByAddingDateDesc(company);
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Feedback> getTop(Long serviceId, Integer count) {
        CleaningCompany company = companyService.getOne(serviceId);
        if (company != null) {
            return feedbackRepository.findTop(company.getId(), count);
        } else {
            return Collections.emptyList();
        }
    }
}
