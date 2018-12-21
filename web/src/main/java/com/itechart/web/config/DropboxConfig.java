package com.itechart.web.config;

import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DropboxConfig {
    @Value("${dropbox.accessToken}")
    private String accessToken;

    @Bean
    public DbxClientV2 dbxClientV2() {
        DbxRequestConfig config = DbxRequestConfig.newBuilder("cleaning-service").build();
        return new DbxClientV2(config, accessToken);
    }
}
