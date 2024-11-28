package com.application.vaccine_system.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.vaccine_system.annotation.ApiMessage;
import com.application.vaccine_system.exception.InvalidException;
import com.application.vaccine_system.model.VaccinationCenter;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.service.VaccinationCenterService;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/centers")
public class VaccinationCenterController {

    private final VaccinationCenterService vaccinationCenterService;

    public VaccinationCenterController(VaccinationCenterService vaccinationCenterService) {
        this.vaccinationCenterService = vaccinationCenterService;
    }

    @GetMapping("/{id}")
    @ApiMessage("Get a center by id")
    public ResponseEntity<VaccinationCenter> getVaccinationCenterById(@PathVariable Long id) throws InvalidException {
        return ResponseEntity.ok().body(vaccinationCenterService.getVaccinationCenterById(id));
    }

    @GetMapping
    @ApiMessage("Get all centers")
    public ResponseEntity<Pagination> getAllVaccinationCenters(@Filter Specification<VaccinationCenter> specification,
            Pageable pageable) {
        return ResponseEntity.ok().body(vaccinationCenterService.getAllVaccines(specification, pageable));
    }

    @PostMapping
    @ApiMessage("Create a new center")
    public ResponseEntity<VaccinationCenter> createVaccine(@Valid @RequestBody VaccinationCenter vaccinationCenter)
            throws InvalidException {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(vaccinationCenterService.createVaccinationCenter(vaccinationCenter));
    }

    @PutMapping("/{id}")
    @ApiMessage("Update a center")
    public ResponseEntity<VaccinationCenter> updateVaccine(@PathVariable Long id,
            @Valid @RequestBody VaccinationCenter vaccinationCenter) throws InvalidException {
        return ResponseEntity.ok().body(vaccinationCenterService.updateVaccinationCenter(id, vaccinationCenter));
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a center")
    public void deleteVaccine(@PathVariable Long id) throws InvalidException {
        vaccinationCenterService.deleteVaccinationCenter(id);
    }
}
