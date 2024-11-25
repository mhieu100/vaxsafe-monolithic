package com.application.vaccine_system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.application.vaccine_system.model.Cashier;
import com.application.vaccine_system.model.Doctor;
import com.application.vaccine_system.model.Patient;
import com.application.vaccine_system.model.User;

import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.model.response.cashier.CashierDTO;
import com.application.vaccine_system.model.response.doctor.DoctorDTO;
import com.application.vaccine_system.repository.CashierRepository;
import com.application.vaccine_system.repository.PatientRepository;
import com.application.vaccine_system.repository.UserRepository;
import com.application.vaccine_system.repository.DoctorRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final CashierRepository cashierRepository;

    public UserService(UserRepository userRepository, DoctorRepository doctorRepository,
            PatientRepository patientRepository, CashierRepository cashierRepository) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.cashierRepository = cashierRepository;
    }

    // public Vaccine getVaccineById(Long id) throws InvalidException {
    // return vaccineRepository.findById(id)
    // .orElseThrow(() -> new InvalidException("Vaccine not found with id: " + id));
    // }

    public Pagination getAllUsers(Specification<User> specification, Pageable pageable) {
        Page<User> pageUser = userRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageUser.getTotalPages());
        meta.setTotal(pageUser.getTotalElements());

        pagination.setMeta(meta);

        List<User> listUsers = pageUser.getContent()
                .stream()
                .collect(Collectors.toList());

        pagination.setResult(listUsers);

        return pagination;
    }

    public Pagination getAllPatients(Specification<Patient> specification, Pageable pageable) {
        Page<Patient> pagePatient = patientRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pagePatient.getTotalPages());
        meta.setTotal(pagePatient.getTotalElements());

        pagination.setMeta(meta);

        List<Patient> listPatients = pagePatient.getContent()
                .stream()
                .collect(Collectors.toList());

        pagination.setResult(listPatients);

        return pagination;
    }

     public DoctorDTO convertToDoctorDTO(Doctor doctor) {
        DoctorDTO res = new DoctorDTO();
        if(doctor.getCenter() != null) {
            res.setCenter(new DoctorDTO.CenterDoctor(doctor.getCenter().getCenterId(), doctor.getCenter().getName()));
        }
        res.setDoctorId(doctor.getDoctorId());
        res.setUser(doctor.getUser());
        res.setSpecialization(doctor.getSpecialization());
        res.setWorkingHours(doctor.getWorkingHours());
        return res;
    }

    public Pagination getAllDoctors(Specification<Doctor> specification, Pageable pageable) {
        Page<Doctor> pageDoctor = doctorRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageDoctor.getTotalPages());
        meta.setTotal(pageDoctor.getTotalElements());

        pagination.setMeta(meta);

        List<DoctorDTO> listDoctors = pageDoctor.getContent()
                .stream().map(this::convertToDoctorDTO)
                .collect(Collectors.toList());

        pagination.setResult(listDoctors);

        return pagination;
    }

    public CashierDTO convertToCashierDTO(Cashier cashier) {
        CashierDTO res = new CashierDTO();
        if(cashier.getCenter() != null) {
            res.setCenter(new CashierDTO.CenterDoctor(cashier.getCenter().getCenterId(), cashier.getCenter().getName()));
        }
        res.setCashierId(cashier.getCashierId());
        res.setUser(cashier.getUser());
        return res;
    }

    public Pagination getAllCashiers(Specification<Cashier> specification, Pageable pageable) {
        Page<Cashier> pageCashier = cashierRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageCashier.getTotalPages());
        meta.setTotal(pageCashier.getTotalElements());

        pagination.setMeta(meta);

        List<CashierDTO> listCashiers = pageCashier.getContent()
                .stream().map(this::convertToCashierDTO)
                .collect(Collectors.toList());

        pagination.setResult(listCashiers);

        return pagination;
    }

    // public Vaccine createVaccine(Vaccine vaccine) throws InvalidException {
    // if (vaccineRepository.existsByVaccineName(vaccine.getVaccineName())) {
    // throw new InvalidException("Vaccine already exists with name: " +
    // vaccine.getVaccineName());
    // }
    // return vaccineRepository.save(vaccine);
    // }

    // public Vaccine updateVaccine(Long id, Vaccine vaccine) throws
    // InvalidException {
    // if (!vaccineRepository.existsById(id)) {
    // throw new InvalidException("Vaccine not found with id: " + id);
    // }
    // vaccine.setVaccineId(id);
    // vaccine.setVaccineName(vaccine.getVaccineName());
    // vaccine.setImage(vaccine.getImage());
    // vaccine.setDescription(vaccine.getDescription());
    // vaccine.setDisease(vaccine.getDisease());
    // vaccine.setAgeRange(vaccine.getAgeRange());
    // vaccine.setDosage(vaccine.getDosage());
    // vaccine.setManufacturer(vaccine.getManufacturer());
    // vaccine.setPrice(vaccine.getPrice());
    // vaccine.setRequiredDoses(vaccine.getRequiredDoses());
    // return vaccineRepository.save(vaccine);

    // }

    // public void deleteVaccine(Long id) throws InvalidException {
    // if (!vaccineRepository.existsById(id)) {
    // throw new InvalidException("Vaccine not found with id: " + id);
    // }
    // vaccineRepository.deleteById(id);
    // }
}
