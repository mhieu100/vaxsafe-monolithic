package com.application.vaccine_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.vaccine_system.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Role findByName(String name);
}
