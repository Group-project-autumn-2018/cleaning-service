package com.itechart.web.config;


import com.itechart.common.entity.User;
import com.itechart.common.service.CustomUserDetails;
import com.itechart.common.service.UserDetailsServiceImpl;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.Map;

public class CustomTokenEnhancer implements TokenEnhancer {



    @Override
    public OAuth2AccessToken enhance( OAuth2AccessToken accessToken, OAuth2Authentication authentication) {







        Map<String, Object> additionalInfo = new HashMap<>();

        CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
        String name = userDetails.getName();
        additionalInfo.put(
                "name", name);

        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(
                additionalInfo);
        return accessToken;
    }
}
