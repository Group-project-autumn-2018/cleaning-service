package com.itechart.web.config.social;

import com.itechart.common.entity.Role;
import com.itechart.common.service.CustomUserDetails;
import com.itechart.common.service.RoleService;
import com.itechart.common.service.impl.UserDetailsServiceImpl;
import com.itechart.customer.entity.Customer;
import com.itechart.customer.repository.CustomerRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;

@Service
public interface SsoSaveUserHandler {

    Log log = LogFactory.getLog(CustomOAuth2UserService.class);

    UserDetailsServiceImpl getUserDetailsService();

    CustomerRepository getCustomerRepository();

    RoleService getRoleService();

    default void saveUser(Map<String, Object> attributes) {
        String email = (String) attributes.get("email");

        CustomUserDetails user = null;
        try {
            user = (CustomUserDetails) getUserDetailsService().loadUserByUsername(email);
            log.info("User " + email + " already exists");
            if (!user.isAccountNonLocked()) {
                throw new LockedException("Your account is locked");
            }
        } catch (UsernameNotFoundException e) {
            log.info("User " + email + " doesn't exists. Saving...");
        }
        if (user == null) {
            Customer newUser = new Customer();
            newUser.setUsername((String) attributes.get("name"));
            newUser.setEmail(email);
            LocalDate date = LocalDate.now();
            Role role = getRoleService().getRole("customer");
            newUser.setRoles(Collections.singletonList(role));
            newUser.setAddingDate(date);
            getCustomerRepository().save(newUser);
            log.info("New customer saved " + email);
        }
    }
}
