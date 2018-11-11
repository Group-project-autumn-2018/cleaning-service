package com.itechart.service.dto;


import lombok.Data;

@Data
public class TimingOptionsDto {
    private int numberOfSmallRooms;
    private int numberOfBigRooms;
    private int numberOfBathrooms;
    private int timeOfCleaningSmallRooms;
    private int timeOfCleaningBigRooms;
    private int timeOfCleaningBathrooms;
    private double coefficient;



}
