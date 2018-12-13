package com.itechart.common.service.impl;

import com.itechart.common.service.SMSService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/**
 * Rest client implementation for semysms service
 * for use this service you need to install SemySMS android app and register on semysms.net
 * then change properties like gsm.token and gsm.device.code
 */
@Service
public class SMSServiceImpl implements SMSService {
    private final RestTemplate restTemplate;
    @Value("${gsm.device.code}")
    private Integer deviceCode;
    @Value("${gsm.token}")
    private String token;
    @Value("${gsm.gateway.url}")
    private String gatewayUrl;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public SMSServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public void sendSMS(String phoneNumber, String text) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("phone", phoneNumber);
        map.add("msg", text);
        map.add("device", deviceCode.toString());
        map.add("token", token);
        map.add("priority", "999999");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(gatewayUrl, request, String.class);
        HttpStatus statusCode = response.getStatusCode();
        if (statusCode == HttpStatus.OK) {
            logger.info("SMS to " + phoneNumber + " has been sent.");
        } else {
            logger.info("Error sending SMS to " + phoneNumber + " with status code: " + statusCode);
        }
    }
}
