package com.application.vaccine_system.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long paymentId;

    @ManyToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    Appointment appointment;

    LocalDate paymentDate;

    @Column(nullable = false)
    Double amount;

    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    PaymentStatus status;

    public enum PaymentMethod {
        CASH, CREDIT_CARD
    }

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED
    }
}
