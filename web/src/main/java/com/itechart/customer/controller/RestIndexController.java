package com.itechart.customer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestIndexController {
    @GetMapping("/")
    public String getIndex() {
       return "index";
    }

    @GetMapping("/private")
    public String getPrivate() {
        return "private";
    }
}
