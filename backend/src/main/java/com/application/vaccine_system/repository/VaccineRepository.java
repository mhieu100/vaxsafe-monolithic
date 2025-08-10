package com.application.vaccine_system.repository;

import com.application.vaccine_system.model.Vaccine;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface VaccineRepository extends JpaRepository<Vaccine, Long>, JpaSpecificationExecutor<Vaccine> {
    boolean existsByName(String vaccineName);
    List<Vaccine> findAllByName(String vaccineName);
}
