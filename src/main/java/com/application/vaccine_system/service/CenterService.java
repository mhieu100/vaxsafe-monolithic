package com.application.vaccine_system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.application.vaccine_system.exception.InvalidException;
import com.application.vaccine_system.model.Center;
import com.application.vaccine_system.model.response.CenterDTO;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.repository.CenterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CenterService {
    private final CenterRepository centerRepository;

    

    public CenterDTO convertToCenterDTO(Center vaccinationCenter) {
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

    public CenterDTO getVaccinationCenterById(Long id) throws InvalidException {
        return convertToCenterDTO(centerRepository.findById(id)
                .orElseThrow(() -> new InvalidException("Vaccination Center not found with id: " + id)));
    }

    public Pagination getAllVaccines(Specification<Center> specification, Pageable pageable) {
        Page<Center> pageVaccinationCenter = centerRepository.findAll(specification, pageable);
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

    public Center createVaccinationCenter(Center vaccinationCenter) throws InvalidException {
        if (centerRepository.existsByName(vaccinationCenter.getName())) {
            throw new InvalidException("Vaccination Center already exists with name: " + vaccinationCenter.getName());
        }
        return centerRepository.save(vaccinationCenter);
    }

    public Center updateVaccinationCenter(Long id, Center vaccinationCenter)
            throws InvalidException {
        if (!centerRepository.existsById(id)) {
            throw new InvalidException("Vaccination Center not found with id: " + id);
        }
        vaccinationCenter.setCenterId(id);
        return centerRepository.save(vaccinationCenter);
    }

    public void deleteVaccinationCenter(Long id) throws InvalidException {
        if (!centerRepository.existsById(id)) {
            throw new InvalidException("Vaccination Center not found with id: " + id);
        }
        centerRepository.deleteById(id);
    }
}
