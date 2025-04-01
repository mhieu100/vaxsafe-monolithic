package com.application.vaccine_system.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userId;
    String fullname;
    String email;
    String phoneNumber;
    String password;
    LocalDate birthday;
    String address;
    boolean isDeleted;
    @Column(columnDefinition = "MEDIUMTEXT")
    String refreshToken;
    @ManyToOne
    @JoinColumn(name = "center_id")
    Center center;
    @ManyToOne
    @JoinColumn(name = "role_id")
    Role role;
}
