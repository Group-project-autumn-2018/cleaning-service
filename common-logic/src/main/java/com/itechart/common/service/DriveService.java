package com.itechart.common.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DriveService {
    byte[] getLogotype(Long serviceId) throws IOException;

    void saveLogotype(MultipartFile logotype, Long id);
}
