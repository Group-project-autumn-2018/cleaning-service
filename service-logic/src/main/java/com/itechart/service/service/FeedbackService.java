package com.itechart.service.service;

import com.itechart.service.dto.FeedbackDto;
import com.itechart.service.entity.Feedback;

import java.util.List;

public interface FeedbackService {
    Long addFeedback(FeedbackDto feedbackDto);

    List<Feedback> getAll(Long serviceId);

    List<Feedback> getTop(Long serviceId, Integer count);
}
