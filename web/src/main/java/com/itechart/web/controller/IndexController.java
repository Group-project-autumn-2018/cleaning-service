package com.itechart.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @GetMapping("/")
    public String getIndex() {
       return "index";
    }

    @GetMapping("/private")
    public String getPrivate() {
        return "private";
    }
}
