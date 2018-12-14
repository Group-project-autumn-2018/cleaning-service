package com.itechart.web.config;

import com.itechart.common.service.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public class GoogleOauth2AuthProvider implements AuthenticationProvider {

    private static final Logger logger = LoggerFactory.getLogger(GoogleOauth2AuthProvider.class);

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        logger.info("Provider Manager Executed");
        CustomUserDetails registeredUser = (CustomUserDetails) authentication.getPrincipal();
        try {
            registeredUser = (CustomUserDetails) userDetailsService
                    .loadUserByUsername(registeredUser.getName());
        } catch (UsernameNotFoundException usernameNotFoundException) {
            logger.info("User trying google/login not already a registered user. Register Him !!");
        }
        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return OAuth2Authentication.class.isAssignableFrom(authentication);
    }
}