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


    public int getNumberOfSmallRooms() {
        return numberOfSmallRooms;
    }

    public void setNumberOfSmallRooms(int numberOfSmallRooms) {
        this.numberOfSmallRooms = numberOfSmallRooms;
    }

    public int getNumberOfBigRooms() {
        return numberOfBigRooms;
    }

    public void setNumberOfBigRooms(int numberOfBigRooms) {
        this.numberOfBigRooms = numberOfBigRooms;
    }

    public int getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(int numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public int getTimeOfCleaningSmallRooms() {
        return timeOfCleaningSmallRooms;
    }

    public void setTimeOfCleaningSmallRooms(int timeOfCleaningSmallRooms) {
        this.timeOfCleaningSmallRooms = timeOfCleaningSmallRooms;
    }

    public int getTimeOfCleaningBigRooms() {
        return timeOfCleaningBigRooms;
    }

    public void setTimeOfCleaningBigRooms(int timeOfCleaningBigRooms) {
        this.timeOfCleaningBigRooms = timeOfCleaningBigRooms;
    }

    public int getTimeOfCleaningBathrooms() {
        return timeOfCleaningBathrooms;
    }

    public void setTimeOfCleaningBathrooms(int timeOfCleaningBathrooms) {
        this.timeOfCleaningBathrooms = timeOfCleaningBathrooms;
    }

    public double getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(double coefficient) {
        this.coefficient = coefficient;
    }
}
