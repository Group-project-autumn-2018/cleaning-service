package com.itechart.web.config.social;

import com.itechart.common.entity.Role;
import com.itechart.common.service.CustomUserDetails;
import com.itechart.common.service.RoleService;
import com.itechart.common.service.impl.UserDetailsServiceImpl;
import com.itechart.customer.entity.Customer;
import com.itechart.customer.repository.CustomerRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;
import java.util.Set;

public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Log log = LogFactory.getLog(CustomOAuth2UserService.class);

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoleService roleService;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oath2User = super.loadUser(userRequest);
        return buildPrincipal(oath2User);
    }


    private OAuth2User buildPrincipal(OAuth2User oath2User) {

        Map<String, Object> attributes = oath2User.getAttributes();
        Set<GrantedAuthority> authorities = (Set<GrantedAuthority>) oath2User.getAuthorities();
        this.saveUser(attributes);
        OAuth2User result = new DefaultOAuth2User(authorities, attributes, "email");
        return result;
    }

    private void saveUser(Map<String, Object> attributes) {
        String email = (String) attributes.get("email");

        CustomUserDetails user = null;
        try {
            user = (CustomUserDetails) userDetailsService.loadUserByUsername(email);
            log.info("User " + email + " already exists");
        } catch (UsernameNotFoundException e) {
            log.info("User " + email + " doesn't exists. Saving...");
        }
        if (user == null) {
            Customer newUser = new Customer();
            newUser.setUsername((String) attributes.get("name"));
            newUser.setEmail(email);
            LocalDate date = LocalDate.now();
            Role role = roleService.getRole("customer");
            newUser.setRoles(Collections.singletonList(role));
            newUser.setAddingDate(date);
            customerRepository.save(newUser);
            log.info("New customer saved " + email);
        }
    }
}

