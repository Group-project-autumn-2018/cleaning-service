package com.itechart.common.service.impl;

import com.dropbox.core.DbxException;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.files.SearchResult;
import com.itechart.common.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    private final DbxClientV2 client;

    @Autowired
    public FileStorageServiceImpl(DbxClientV2 client) {
        this.client = client;
    }

    @Override
    public boolean isFileExist(String filename) throws IOException {
        SearchResult result = null;
        try {
            result = client.files().search("", filename);
        } catch (DbxException e) {
            throw new IOException(e.getMessage());
        }
        return result.getMatches().stream().anyMatch((element) -> element.getMetadata().getName().equals(filename));
    }

    @Override
    public byte[] getLogotype(String filename) throws IOException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            client.files().download("/" + filename).download(outputStream);
            return outputStream.toByteArray();
        } catch (DbxException e) {
            throw new IOException(e.getMessage());
        }
    }

    @Override
    public void saveLogotype(MultipartFile logotype, String filename) throws IOException {
        saveFile(logotype, filename);
    }

    @Override
    public void saveLogotype(byte[] logotype, String filename) throws IOException {
        try (InputStream in = new ByteArrayInputStream(logotype)) {
            client.files().uploadBuilder("/" + filename).uploadAndFinish(in);
        } catch (IOException | DbxException e) {
            throw new IOException(e.getMessage());
        }
    }

    private FileMetadata saveFile(MultipartFile logotype, String filename) throws IOException {
        FileMetadata metadata;
        try (InputStream in = logotype.getInputStream()) {
            metadata = client.files().uploadBuilder("/" + filename).uploadAndFinish(in);
        } catch (IOException | DbxException e) {
            throw new IOException(e.getMessage());
        }
        return metadata;
    }
}
