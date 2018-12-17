package com.itechart.web.config.social;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itechart.common.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class CustomTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(CustomTokenProvider.class);

    @Autowired
    private TokenStore tokenStore;

    @Autowired
    private JwtAccessTokenConverter accessTokenConverter;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Value("${oauth.token.accessTokenValiditySeconds}")
    private int accessTokenValiditySeconds = 3600;

    @Value("${oauth.token.refreshTokenValiditySeconds}")
    private int refreshTokenValiditySeconds = 30000;

    @Value("${oauth.token.key}")
    private String tokenKey;


    public DefaultOAuth2AccessToken createToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        String email = (String) oAuth2AuthenticationToken.getPrincipal().getAttributes().get("email");
        OAuth2Authentication oAuth2Authentication = convertAuthentication(authentication,
                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());


        DefaultTokenServices tokenServices = new DefaultTokenServices();
        tokenServices.setTokenStore(tokenStore);
        tokenServices.setAccessTokenValiditySeconds(accessTokenValiditySeconds);
        tokenServices.setSupportRefreshToken(true);
        tokenServices.setRefreshTokenValiditySeconds(refreshTokenValiditySeconds);


        DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) tokenServices.createAccessToken(oAuth2Authentication);

        Set<String> scope = new HashSet<>();
        scope.add("read");
        scope.add("write");
        token.setScope(scope);

        String jwtAccessToken = this.getJWTToken(email,
                (String) oAuth2AuthenticationToken.getPrincipal().getAttributes().get("name"),
                accessTokenValiditySeconds);

        token.setValue(jwtAccessToken);

        tokenStore.storeAccessToken(token, oAuth2Authentication);
        tokenStore.storeRefreshToken(token.getRefreshToken(), oAuth2Authentication);

        return token;
    }

    private OAuth2Authentication convertAuthentication(Authentication authentication, String authorizedClientRegistrationId) {

        OAuth2Request request = new OAuth2Request(null, authorizedClientRegistrationId, authentication.getAuthorities(), true, null, null, null, null, null);
        return new OAuth2Authentication(request, authentication);
    }

    private String getJWTToken(String email, String name, int validity) {

        Map<String, Object> payload = new HashMap<>();
        payload.put("user_name", email);
        payload.put("name", name);
        payload.put("expiration", validity - 1);
        List<String> authorities = Collections.singletonList("customer");
        payload.put("authorities", authorities);
        ObjectMapper mapper = new ObjectMapper();
        String jsonPayload = null;
        String secret = Base64.getEncoder().encodeToString(tokenKey.getBytes());
        try {
            jsonPayload = mapper.writeValueAsString(payload);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String jws = Jwts.builder()
                .setPayload(jsonPayload)
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(new Date().getTime() + validity * 1000))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
        return jws;
    }
}