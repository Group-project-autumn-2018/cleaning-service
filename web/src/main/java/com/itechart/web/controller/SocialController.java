package com.itechart.web.controller;

import com.itechart.common.service.impl.UserDetailsServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;


@RestController
public class SocialController {

    @GetMapping("/oauth/user")
    public void getUser(Principal principal) {
        principal.getName();
        UserDetailsServiceImpl user = (UserDetailsServiceImpl) principal;
    }
}
