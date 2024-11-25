package com.application.vaccine_system.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.vaccine_system.annotation.ApiMessage;
import com.application.vaccine_system.model.Cashier;
import com.application.vaccine_system.model.Doctor;
import com.application.vaccine_system.model.Patient;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.service.UserService;
import com.turkraft.springfilter.boot.Filter;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // @GetMapping("/{id}")
    // @ApiMessage("Get a vaccine by id")
    // public ResponseEntity<Vaccine> getVaccineById(@PathVariable Long id) throws
    // InvalidException {
    // return ResponseEntity.ok().body(vaccineService.getVaccineById(id));
    // }

    @GetMapping
    @ApiMessage("Get all users")
    public ResponseEntity<Pagination> getAllUsers(@Filter Specification<User> specification,
            Pageable pageable) {
        return ResponseEntity.ok().body(userService.getAllUsers(specification, pageable));
    }

    @GetMapping("/patients")
    @ApiMessage("Get all patients")
    public ResponseEntity<Pagination> getAllVaccines(@Filter Specification<Patient> specification,
            Pageable pageable) {
        return ResponseEntity.ok().body(userService.getAllPatients(specification, pageable));
    }

    @GetMapping("/doctors")
    @ApiMessage("Get all doctors")
    public ResponseEntity<Pagination> getAllDoctors(@Filter Specification<Doctor> specification,
            Pageable pageable) {
        return ResponseEntity.ok().body(userService.getAllDoctors(specification, pageable));
    }

    @GetMapping("/cashiers")
    @ApiMessage("Get all cashiers")
    public ResponseEntity<Pagination> getAllCashiers(@Filter Specification<Cashier> specification,
            Pageable pageable) {
        return ResponseEntity.ok().body(userService.getAllCashiers(specification, pageable));
    }

    // @PostMapping
    // @ApiMessage("Create a new vaccine")
    // public ResponseEntity<Vaccine> createVaccine(@Valid @RequestBody Vaccine
    // vaccine) throws InvalidException {
    // return
    // ResponseEntity.status(HttpStatus.CREATED).body(vaccineService.createVaccine(vaccine));
    // }

    // @PutMapping("/{id}")
    // @ApiMessage("Update a vaccine")
    // public Vaccine updateVaccine(@PathVariable Long id,@Valid @RequestBody
    // Vaccine vaccine) throws InvalidException {
    // return vaccineService.updateVaccine(id, vaccine);
    // }

    // @DeleteMapping("/{id}")
    // @ApiMessage("Delete a vaccine")
    // public void deleteVaccine(@PathVariable Long id) throws InvalidException {
    // vaccineService.deleteVaccine(id);
    // }
}
