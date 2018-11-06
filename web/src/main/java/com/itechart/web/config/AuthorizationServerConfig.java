//package com.itechart.web.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
//import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
//import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
//import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
//import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
//import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
//import org.springframework.security.oauth2.provider.token.TokenStore;
//import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
//import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
//
//@Configuration
//@EnableAuthorizationServer
//public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    private int accessTokenValiditySeconds = 10000;
//    private int refreshTokenValiditySeconds = 30000;
//
//    @Value("${security.oauth2.resource.id}")
//    private String resourceId;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    @Qualifier("userDetailsServiceImpl")
//    UserDetailsService userDetailsService;
//
//    @Autowired
//    public void authenticationManager(AuthenticationManagerBuilder builder) throws Exception {
//        builder.userDetailsService(userDetailsService);
//    }
//
//    @Override
//    public void configure(AuthorizationServerEndpointsConfigurer endpoints){
//        endpoints
//                .tokenStore(tokenStore())
//                .accessTokenConverter(accessTokenConverter())
//                .authenticationManager(authenticationManager).allowedTokenEndpointRequestMethods(HttpMethod.GET, HttpMethod.POST);
//    }
//
//
//
//
//    @Bean
//    public TokenStore tokenStore() {
//        return new JwtTokenStore(accessTokenConverter());
//    }
//
//    @Bean
//    public JwtAccessTokenConverter accessTokenConverter() {
//        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
//        converter.setSigningKey("123");
//        return converter;
//    }
//
//    @Bean
//    @Primary
//    public DefaultTokenServices tokenServices() {
//        DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
//        defaultTokenServices.setTokenStore(tokenStore());
//        defaultTokenServices.setSupportRefreshToken(true);
//        return defaultTokenServices;
//    }
//
//
//    @Override
//    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
//        security.tokenKeyAccess("permitAll()")
//                .checkTokenAccess("isAuthenticated()").allowFormAuthenticationForClients();
//    }
//
//    @Override
//    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
//        clients.inMemory()
//                .withClient("cleaning-app")
//                .authorizedGrantTypes("client_credentials", "password", "refresh_token")
//                .authorities("ROLE_TRUSTED_CLIENT")
//                .scopes("read", "write")
//                .resourceIds(resourceId)
//                .accessTokenValiditySeconds(accessTokenValiditySeconds)
//                .refreshTokenValiditySeconds(refreshTokenValiditySeconds)
//                .secret(bCryptPasswordEncoder.encode("secret"));
//    }
//
//
//}
