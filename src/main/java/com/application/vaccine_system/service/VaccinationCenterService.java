package com.application.vaccine_system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.application.vaccine_system.exception.InvalidException;
import com.application.vaccine_system.model.VaccinationCenter;
import com.application.vaccine_system.model.response.CenterDTO;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.repository.VaccinationCenterRepository;

@Service
public class VaccinationCenterService {
    private final VaccinationCenterRepository vaccinationCenterRepository;

    public VaccinationCenterService(VaccinationCenterRepository vaccinationCenterRepository) {
        this.vaccinationCenterRepository = vaccinationCenterRepository;
    }

    public VaccinationCenter getVaccinationCenterById(Long id) throws InvalidException {
        return vaccinationCenterRepository.findById(id)
                .orElseThrow(() -> new InvalidException("Vaccination Center not found with id: " + id));
    }

    public CenterDTO convertToCenterDTO(VaccinationCenter vaccinationCenter) {
        CenterDTO res = new CenterDTO();
        res.setCenterId(vaccinationCenter.getCenterId());
        res.setName(vaccinationCenter.getName());
        res.setImage(vaccinationCenter.getImage());
        res.setAddress(vaccinationCenter.getAddress());
        res.setPhoneNumber(vaccinationCenter.getPhoneNumber());
        res.setCapacity(vaccinationCenter.getCapacity());
        res.setWorkingHours(vaccinationCenter.getWorkingHours());
        return res;
    }

    public Pagination getAllVaccines(Specification<VaccinationCenter> specification, Pageable pageable) {
        Page<VaccinationCenter> pageVaccinationCenter = vaccinationCenterRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageVaccinationCenter.getTotalPages());
        meta.setTotal(pageVaccinationCenter.getTotalElements());

        pagination.setMeta(meta);

        List<CenterDTO> listVaccinationCenters = pageVaccinationCenter.getContent()
                .stream().map(this::convertToCenterDTO)
                .collect(Collectors.toList());

        pagination.setResult(listVaccinationCenters);

        return pagination;
    }

    public VaccinationCenter createVaccinationCenter(VaccinationCenter vaccinationCenter) throws InvalidException {
        if (vaccinationCenterRepository.existsByName(vaccinationCenter.getName())) {
            throw new InvalidException("Vaccination Center already exists with name: " + vaccinationCenter.getName());
        }
        return vaccinationCenterRepository.save(vaccinationCenter);
    }

    public VaccinationCenter updateVaccinationCenter(Long id, VaccinationCenter vaccinationCenter)
            throws InvalidException {
        if (!vaccinationCenterRepository.existsById(id)) {
            throw new InvalidException("Vaccination Center not found with id: " + id);
        }
        vaccinationCenter.setCenterId(id);
        return vaccinationCenterRepository.save(vaccinationCenter);
    }

    public void deleteVaccinationCenter(Long id) throws InvalidException {
        if (!vaccinationCenterRepository.existsById(id)) {
            throw new InvalidException("Vaccination Center not found with id: " + id);
        }
        vaccinationCenterRepository.deleteById(id);
    }
}
