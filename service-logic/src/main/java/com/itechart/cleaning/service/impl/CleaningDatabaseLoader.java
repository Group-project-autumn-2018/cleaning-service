package com.itechart.cleaning.service.impl;

import com.itechart.cleaning.entity.Cleaning;
import com.itechart.cleaning.repository.CleaningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CleaningDatabaseLoader implements CommandLineRunner {

    private final CleaningRepository repository;

    @Autowired
    public CleaningDatabaseLoader(CleaningRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Cleaning("Gold-Clean", "Gold-Clean@gmail.com", false, "crash"));
        this.repository.save(new Cleaning("Silver-Clean", "Silver-Clean@gmail.com", false, "crash"));
        this.repository.save(new Cleaning("Bronze-Clean", "Bronze-Clean@gmail.com", false, "crash"));
    }
}
