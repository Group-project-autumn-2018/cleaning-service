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
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;
import java.util.Set;

public class CustomOidcUserService extends OidcUserService implements SsoSaveUserHandler {

    private static final Log log = LogFactory.getLog(CustomOAuth2UserService.class);

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoleService roleService;

    @Override
    public UserDetailsServiceImpl getUserDetailsService() {
        return userDetailsService;
    }

    @Override
    public CustomerRepository getCustomerRepository() {
        return customerRepository;
    }

    @Override
    public RoleService getRoleService() {
        return roleService;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {

        OidcUser oidcUser = super.loadUser(userRequest);
        return buildPrincipal(oidcUser);
    }


    private OidcUser buildPrincipal(OidcUser oidcUser) {

        Map<String, Object> attributes = oidcUser.getAttributes();
        saveUser(attributes); // interface method
        return oidcUser;
    }
}