package com.itechart.common.service.impl;

import com.itechart.common.service.DriveService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class DriveServiceImpl implements DriveService {

    @Override
    public byte[] getLogotype(Long serviceId) throws IOException {
        return new byte[0];
    }

    @Override
    public void saveLogotype(MultipartFile logotype, Long id) {

    }
}
