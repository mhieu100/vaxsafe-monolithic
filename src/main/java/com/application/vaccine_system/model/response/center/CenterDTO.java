package com.application.vaccine_system.model.response.center;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CenterDTO {
    Long centerId;
    String name;
    String image;
    String address;
    String phoneNumber;
    int capacity;
    String workingHours;
}
