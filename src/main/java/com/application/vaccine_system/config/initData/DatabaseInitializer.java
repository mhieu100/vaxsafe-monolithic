package com.application.vaccine_system.config.initData;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.vaccine_system.model.Permission;
import com.application.vaccine_system.model.Role;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.repository.PermissionRepository;
import com.application.vaccine_system.repository.RoleRepository;
import com.application.vaccine_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println(">>> START INIT DATABASE");
        long countRoles = this.roleRepository.count();
        long countUsers = this.userRepository.count();
        long countPermissions = this.permissionRepository.count();

       
        
        if (countPermissions == 0) {
            ArrayList<Permission> arr = new ArrayList<>();
            arr.add(new Permission("Create a center", "/centers", "POST", "CENTERS"));
            arr.add(new Permission("Update a center", "/centers", "PUT", "CENTERS"));
            arr.add(new Permission("Delete a center", "/centers/{id}", "DELETE", "CENTERS"));
            arr.add(new Permission("Get a center by id", "/centers/{id}", "GET", "CENTERS"));
            arr.add(new Permission("Get centers with pagination", "/centers", "GET", "CENTERS"));

            arr.add(new Permission("Create a vaccine", "/vaccines", "POST", "VACCINES"));
            arr.add(new Permission("Update a vaccine", "/vaccines", "PUT", "VACCINES"));
            arr.add(new Permission("Delete a vaccine", "/vaccines/{id}", "DELETE", "VACCINES"));
            arr.add(new Permission("Get a vaccine by id", "/vaccines/{id}", "GET", "VACCINES"));
            arr.add(new Permission("Get vaccines with pagination", "/vaccines", "GET", "VACCINES"));

            arr.add(new Permission("Create a permission", "/permissions", "POST", "PERMISSIONS"));
            arr.add(new Permission("Update a permission", "/permissions", "PUT", "PERMISSIONS"));
            arr.add(new Permission("Delete a permission", "/permissions/{id}", "DELETE", "PERMISSIONS"));
            arr.add(new Permission("Get a permission by id", "/permissions/{id}", "GET", "PERMISSIONS"));
            arr.add(new Permission("Get permissions with pagination", "/permissions", "GET", "PERMISSIONS"));

            arr.add(new Permission("Create a user", "/users", "POST", "USERS"));
            arr.add(new Permission("Update a user", "/users", "PUT", "USERS"));
            arr.add(new Permission("Delete a user", "/users/{id}", "DELETE", "USERS"));
            arr.add(new Permission("Get a user by id", "/users/{id}", "GET", "USERS"));
            arr.add(new Permission("Get users with pagination", "/users", "GET", "USERS"));


            arr.add(new Permission("Upload a file", "/files", "GET", "FILES"));

            this.permissionRepository.saveAll(arr);
        }

        if (countRoles == 0) {
            Role adminRole = new Role();
            Role patientRole = new Role();
            Role doctorRole = new Role();
            Role cashierRole = new Role();
            adminRole.setName("ADMIN");
            adminRole.setPermissions(this.permissionRepository.findAll());
            patientRole.setName("PATIENT");
            doctorRole.setName("DOCTOR");
            cashierRole.setName("CASHIER");
            this.roleRepository.save(adminRole);
            this.roleRepository.save(patientRole);
            this.roleRepository.save(doctorRole);
            this.roleRepository.save(cashierRole);
        }

        if (countUsers == 0) {
            User adminUser = new User();
            adminUser.setEmail("admin@gmail.com");
            adminUser.setFullname("I'm admin");
            adminUser.setPassword(this.passwordEncoder.encode("123456"));
            Role adminRole = this.roleRepository.findByName("ADMIN");
            if (adminRole != null) {
                adminUser.setRole(adminRole);
            }
            this.userRepository.save(adminUser);

            User patientUser = new User();
            patientUser.setEmail("patient@gmail.com");
            patientUser.setFullname("I'm patient");
            patientUser.setPassword(this.passwordEncoder.encode("123456"));
            Role patientRole = this.roleRepository.findByName("PATIENT");
            if (patientRole != null) {
                patientUser.setRole(patientRole);
            }
            this.userRepository.save(patientUser);
        }
    }

}
