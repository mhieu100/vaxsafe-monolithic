package com.application.vaccine_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "vaccines")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long vaccineId;
    @NotBlank(message = "Vaccine name is mandatory")
    String name;
    String image;
    @NotBlank(message = "Vaccine manufacturer is mandatory")
    String manufacturer;
    @NotBlank(message = "Vaccine description is mandatory")
    String description;
    @NotBlank(message = "Vaccine disease is mandatory")
    String disease;
    String dosage;
    String ageRange;
    Integer requiredDoses;
    Double price;
    Integer stockQuantity;
    boolean isDeleted;
}
