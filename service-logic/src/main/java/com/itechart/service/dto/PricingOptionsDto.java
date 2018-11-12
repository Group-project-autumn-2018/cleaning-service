package com.itechart.service.dto;

import lombok.Data;


import java.math.BigDecimal;


@Data
public class PricingOptionsDto {
    private int numberOfSmallRooms;
     private int numberOfBigRooms;
     private int numberOfBathrooms;
     private BigDecimal costOfCleaningSmallRooms;
     private BigDecimal costOfCleaningBigRooms;
     private BigDecimal costOfCleaningBathrooms;
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

 public BigDecimal getCostOfCleaningSmallRooms() {
  return costOfCleaningSmallRooms;
 }

 public void setCostOfCleaningSmallRooms(BigDecimal costOfCleaningSmallRooms) {
  this.costOfCleaningSmallRooms = costOfCleaningSmallRooms;
 }

 public BigDecimal getCostOfCleaningBigRooms() {
  return costOfCleaningBigRooms;
 }

 public void setCostOfCleaningBigRooms(BigDecimal costOfCleaningBigRooms) {
  this.costOfCleaningBigRooms = costOfCleaningBigRooms;
 }

 public BigDecimal getCostOfCleaningBathrooms() {
  return costOfCleaningBathrooms;
 }

 public void setCostOfCleaningBathrooms(BigDecimal costOfCleaningBathrooms) {
  this.costOfCleaningBathrooms = costOfCleaningBathrooms;
 }

 public double getCoefficient() {
  return coefficient;
 }

 public void setCoefficient(double coefficient) {
  this.coefficient = coefficient;
 }


}
