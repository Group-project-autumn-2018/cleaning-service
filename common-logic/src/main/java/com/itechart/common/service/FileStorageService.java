package com.itechart.common.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileStorageService {
    boolean isFileExist(String filename) throws IOException;

    byte[] getLogotype(String filename) throws IOException;

    void saveLogotype(MultipartFile logotype, String filename) throws IOException;

    void saveLogotype(byte[] logotype, String filename) throws IOException;
}
