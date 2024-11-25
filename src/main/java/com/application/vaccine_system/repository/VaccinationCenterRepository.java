package com.application.vaccine_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.application.vaccine_system.model.VaccinationCenter;

public interface VaccinationCenterRepository extends JpaRepository<VaccinationCenter, Long>, JpaSpecificationExecutor<VaccinationCenter> {
    boolean existsByName(String name);
}
