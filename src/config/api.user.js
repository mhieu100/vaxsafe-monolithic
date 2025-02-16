import axios from "./axios-customize";

/**
 *
Module User
 */

export const callCreateUser = (
  fullName,
  email,
  phoneNumber,
  password,
  role,
  dateOfBirth,
  address
) => {
  return axios.post("/users", {
    fullName,
    email,
    phoneNumber,
    password,
    role,
    dateOfBirth,
    address,
  });
};

export const callUpdateUser = (
  userId,
  fullName,
  email,
  phoneNumber,
  password,
  role,
  dateOfBirth,
  address
) => {
  return axios.put(`/users/${userId}`, {
    userId,
    fullName,
    email,
    phoneNumber,
    password,
    role,
    dateOfBirth,
    address,
  });
};

export const callFetchUser = (query) => {
  return axios.get(`/users?${query}`);
};

export const callDeleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};

