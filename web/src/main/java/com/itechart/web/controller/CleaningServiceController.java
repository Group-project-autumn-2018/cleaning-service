package com.itechart.web.controller;

import com.itechart.cleaning.entity.Cleaning;
import com.itechart.cleaning.service.CleaningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cleaning")
public class CleaningServiceController {

    private final CleaningService cleaningService;

    @Autowired
    public CleaningServiceController(CleaningService cleaningService) {
        this.cleaningService = cleaningService;
    }

    @GetMapping()
    public Page<Cleaning> findPaginated(
            @RequestParam("page") int page, @RequestParam("size") int size) {

        Page<Cleaning> resultPage = cleaningService.findPaginated(page, size);

        return resultPage;
    }
}
