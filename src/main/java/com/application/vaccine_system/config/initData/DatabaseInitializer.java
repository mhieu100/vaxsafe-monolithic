package com.application.vaccine_system.config.initData;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.vaccine_system.model.Role;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.repository.RoleRepository;
import com.application.vaccine_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println(">>> START INIT DATABASE");
        long countRoles = this.roleRepository.count();
        long countUsers = this.userRepository.count();

        if (countRoles == 0) {
            Role adminRole = new Role();
            Role patientRole = new Role();
            Role doctorRole = new Role();
            Role cashierRole = new Role();
            adminRole.setName("ADMIN");
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
