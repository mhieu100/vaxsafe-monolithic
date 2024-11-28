package com.application.vaccine_system.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.vaccine_system.exception.InvalidException;
import com.application.vaccine_system.model.Cashier;
import com.application.vaccine_system.model.Doctor;
import com.application.vaccine_system.model.Patient;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.model.response.UserDTO;
import com.application.vaccine_system.repository.CashierRepository;
import com.application.vaccine_system.repository.DoctorRepository;
import com.application.vaccine_system.repository.PatientRepository;
import com.application.vaccine_system.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final CashierRepository cashierRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, DoctorRepository doctorRepository,
            PatientRepository patientRepository, CashierRepository cashierRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.cashierRepository = cashierRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(token, email);
    }

    public void updateUserToken(String token, String email) {
        User currentUser = this.getUserByEmail(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(token);
            this.userRepository.save(currentUser);
        }
    }

    public UserDTO convertToUserDTO(User user) {
        UserDTO res = new UserDTO();

        if (user.getDoctor() != null) {
            res.setDoctor(new UserDTO.DoctorUser(user.getDoctor().getDoctorId(), user.getDoctor().getSpecialization(),
                    user.getDoctor().getWorkingHours()));
        }
        if (user.getCashier() != null) {
            res.setCashier(new UserDTO.CashierUser(user.getCashier().getCashierId()));
        }
        if (user.getPatient() != null) {
            res.setPatient(
                    new UserDTO.PatientUser(user.getPatient().getPatientId(), user.getPatient().getMedicalHistory(),
                            user.getPatient().getInsuranceNumber()));
        }
        res.setUserId(user.getUserId());
        res.setFullName(user.getFullName());
        res.setEmail(user.getEmail());
        res.setPhoneNumber(user.getPhoneNumber());
        res.setRole(user.getRole());
        res.setDateOfBirth(user.getDateOfBirth());
        res.setAddress(user.getAddress());
        return res;
    }

    public Pagination getAllUsers(Specification<User> specification, Pageable pageable) {
        Page<User> pageUser = userRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageUser.getTotalPages());
        meta.setTotal(pageUser.getTotalElements());

        pagination.setMeta(meta);

        List<UserDTO> listUsers = pageUser.getContent().stream()
                .map(this::convertToUserDTO).collect(Collectors.toList());

        pagination.setResult(listUsers);

        return pagination;
    }

    public UserDTO createUser(User user) throws InvalidException {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new InvalidException("Email đã tồn tài : " + user.getEmail());
        }
        String hashPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);

        User savedUser = userRepository.save(user);

        if (user.getRole().equals("DOCTOR")) {
            Doctor doctor = new Doctor();
            doctor.setUser(user);
            doctorRepository.save(doctor);
        } else if (user.getRole().equals("CASHIER")) {
            Cashier cashier = new Cashier();
            cashier.setUser(user);
            cashierRepository.save(cashier);
        } else if (user.getRole().equals("PATIENT")) {
            Patient patient = new Patient();
            patient.setUser(user);
            patientRepository.save(patient);
        }
        return convertToUserDTO(savedUser);
    }

    public Patient createPatient(Patient patient) throws InvalidException {
        return patientRepository.save(patient);
    }

    public UserDTO updateUser(Long id, User user) throws InvalidException {
        Optional<User> currentUser = userRepository.findById(id);
        if (currentUser.isEmpty()) {
            throw new InvalidException("User not found with id: " + id);
        }
        currentUser.get().setUserId(id);
        currentUser.get().setFullName(user.getFullName());
        currentUser.get().setEmail(user.getEmail());
        currentUser.get().setPhoneNumber(user.getPhoneNumber());
        currentUser.get().setRole(user.getRole());
        currentUser.get().setDateOfBirth(user.getDateOfBirth());
        currentUser.get().setAddress(user.getAddress());

        return convertToUserDTO(userRepository.save(currentUser.get()));

    }

    public void deleteUser(Long id) throws InvalidException {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new InvalidException("User not found with id: " + id);
        }

        if (user.get().getRole().equals("DOCTOR")) {
            doctorRepository.deleteById(user.get().getDoctor().getDoctorId());
        } else if (user.get().getRole().equals("CASHIER")) {
            cashierRepository.deleteById(user.get().getCashier().getCashierId());
        } else if (user.get().getRole().equals("PATIENT")) {
            patientRepository.deleteById(user.get().getPatient().getPatientId());
        }
        userRepository.deleteById(id);
    }
}
