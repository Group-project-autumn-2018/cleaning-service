package com.itechart.web;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.itechart"})
@EntityScan(basePackages = {"com.itechart"})
@ComponentScan(basePackages = {"com.itechart"})
public class CleaningServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CleaningServiceApplication.class, args);
    }
}
