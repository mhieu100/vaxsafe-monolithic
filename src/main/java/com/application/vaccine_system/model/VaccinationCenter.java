package com.application.vaccine_system.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "vaccination_center")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VaccinationCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long centerId;
    @NotBlank(message = "Vaccination center name is mandatory")
    String name;
    @NotBlank(message = "Vaccination center image is mandatory")
    String image;
    @NotBlank(message = "Vaccination center address is mandatory")
    String address;
    String phoneNumber;
    int capacity;
    @NotBlank(message = "Vaccination center working hours are mandatory")
    String workingHours;

    @OneToMany(mappedBy = "center")
    List<Doctor> doctors;

    @OneToMany(mappedBy = "center")
    List<Cashier> cashiers;
}
