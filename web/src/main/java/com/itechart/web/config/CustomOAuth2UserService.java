package com.itechart.web.config;

import com.itechart.common.entity.User;
import com.itechart.common.service.UserService;
import com.itechart.common.service.impl.UserDetailsServiceImpl;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.security.Principal;
import java.util.Collections;
import java.util.Map;

public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Log log = LogFactory.getLog(CustomOAuth2UserService.class);

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserService userService;

    private PasswordEncoder passwordEncoder;


//    @Autowired
//    public CustomOAuth2UserService(UserDetailsServiceImpl userDetailsService, UserService userService) {
//        this.userDetailsService = userDetailsService;
//        this.userService = userService;
//    }


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oath2User = super.loadUser(userRequest);
        return buildPrincipal(oath2User, userRequest.getClientRegistration().getRegistrationId());
    }


    public OAuth2User buildPrincipal(OAuth2User oath2User, String registrationId) {

        Map<String, Object> attributes = oath2User.getAttributes();
        String email = (String) attributes.get("email");

//        boolean emailVerified = lemonService.getOAuth2AccountVerified(registrationId, attributes);
//        LexUtils.validate(emailVerified, "com.naturalprogrammer.spring.oauth2EmailNotVerified", registrationId).go();

        UserDetails user = userDetailsService.loadUserByUsername(email);
//        OAuth2User newUser = new DefaultOAuth2User(Collections.singletonList());
//            // register a new user
//            U newUser = lemonService.newUser();
//            newUser.setEmail(email);
//            newUser.setPassword(passwordEncoder.encode(LemonUtils.uid()));
//
//            lemonService.fillAdditionalFields(registrationId, newUser, attributes);
//            lemonService.save(newUser);
//
//            try {
//
//                lemonService.mailForgotPasswordLink(newUser);
//
//            } catch (Throwable e) {
//
//                // In case of exception, just log the error and keep silent
//                log.error(ExceptionUtils.getStackTrace(e));
//            }

        return oath2User;
    }

}

