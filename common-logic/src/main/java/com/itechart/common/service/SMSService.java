package com.itechart.common.service;

public interface SMSService {
    void sendSMS(String phoneNumber, String text);
}
