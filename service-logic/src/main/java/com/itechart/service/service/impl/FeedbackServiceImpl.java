package com.itechart.service.service.impl;

import com.itechart.common.entity.User;
import com.itechart.common.service.EmailService;
import com.itechart.common.service.UserService;
import com.itechart.customer.service.CustomerService;
import com.itechart.service.dto.FeedbackDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Feedback;
import com.itechart.service.repository.CleaningCompanyRepository;
import com.itechart.service.repository.FeedbackRepository;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.FeedbackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final CleaningCompanyService companyService;
    private final EmailService emailService;
    private final UserService userService;
    private final CustomerService customerService;
    private final CleaningCompanyRepository companyRepository;
    private static final String SUBJECT = "Someone left feedback ";
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository,
                               EmailService emailService,
                               CleaningCompanyService companyService,
                               UserService userService,
                               CustomerService customerService,
                               CleaningCompanyRepository companyRepository) {
        this.feedbackRepository = feedbackRepository;
        this.emailService = emailService;
        this.companyService = companyService;
        this.userService = userService;
        this.customerService = customerService;
        this.companyRepository = companyRepository;
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
    public Page<Feedback> getAllByCompany(Long serviceId, Pageable pageable) {
        CleaningCompany company = companyService.getOne(serviceId);
        if (company != null) {
            return feedbackRepository.findAllByCompanyOrderByAddingDateDesc(pageable, company);
        } else {
            return null;
        }
    }

    @Override
    public List<Feedback> getTop(Long serviceId, Long count) {
        CleaningCompany company = companyService.getOne(serviceId);
        if (company != null) {
            return feedbackRepository.findTop(company.getId(), count);
        } else {
            return Collections.emptyList();
        }
    }

    //@Scheduled(cron = "000?***")
    @Scheduled(fixedRate = 3_600_000)
    private void countingAverageRating() {
        logger.info("Counting average rating...");
        int averageRating;
        Optional<Double> optionalRating;
        List<CleaningCompany> companies = companyService.getAll();
        for (CleaningCompany company : companies) {
            optionalRating = feedbackRepository.findAverageRating(company);
            if (optionalRating.isPresent()) {
                averageRating = optionalRating.get().intValue();
                company.setAverageRating(averageRating);
                companyRepository.save(company);
            }
        }
    }
}
