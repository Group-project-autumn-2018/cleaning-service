package com.itechart.service.service;

import com.itechart.service.dto.FeedbackDto;
import com.itechart.service.entity.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeedbackService {
    Long addFeedback(FeedbackDto feedbackDto);

    Page<Feedback> getAllByCompany(Long serviceId, Pageable pageable);

    List<Feedback> getTop(Long serviceId, Long count);
}
