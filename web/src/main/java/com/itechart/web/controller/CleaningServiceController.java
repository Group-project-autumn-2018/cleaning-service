package com.itechart.web.controller;

import com.itechart.service.dto.FeedbackDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cleaning")
public class CleaningServiceController {

    private final CleaningCompanyService cleaningCompanyService;
    private final FeedbackService feedbackService;

    @Autowired
    public CleaningServiceController(CleaningCompanyService cleaningCompanyService, FeedbackService feedbackService) {
        this.cleaningCompanyService = cleaningCompanyService;
        this.feedbackService = feedbackService;
    }

    @GetMapping()
    public Page<CleaningCompany> findPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {
        return cleaningCompanyService.findPaginated(page, size);
    }

    @PutMapping("/{cleaningId}")
    public void getOneById(@RequestBody CleaningCompany cleaningCompany) {
        cleaningCompanyService.update(cleaningCompany);
    }

    @PostMapping("/feedback")
    public ResponseEntity addFeedback(@RequestBody FeedbackDto feedbackDto) {
        Long ratingId = feedbackService.addFeedback(feedbackDto);
        if (ratingId == 0) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        else return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
