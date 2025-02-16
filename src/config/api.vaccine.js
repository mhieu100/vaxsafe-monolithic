import axios from "./axios-customize";

/**
 *
Module Vaccine
 */

export const callCreateVaccine = (
  vaccineName,
  description,
  image,
  manufacturer,
  disease,
  dosage,
  ageRange,
  price,
  stockQuantity,
  requiredDoses
) => {
  return axios.post("/vaccines", {
    vaccineName,
    description,
    image,
    manufacturer,
    disease,
    dosage,
    ageRange,
    price,
    stockQuantity,
    requiredDoses,
  });
};

export const callUpdateVaccine = (
  vaccnineId,
  vaccineName,
  description,
  image,
  manufacturer,
  disease,
  dosage,
  ageRange,
  price,
  stockQuantity,
  requiredDoses
) => {
  return axios.put(`/vaccines/${vaccnineId}`, {
    vaccineName,
    description,
    image,
    manufacturer,
    disease,
    dosage,
    ageRange,
    price,
    stockQuantity,
    requiredDoses,
  });
};

export const callFetchVaccine = (query) => {
  return axios.get(`/vaccines?${query}`);
};

export const callDeleteVaccine = (id) => {
  return axios.delete(`/vaccines/${id}`);
};

