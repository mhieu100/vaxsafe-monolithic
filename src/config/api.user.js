import axios from "./axios-customize";

/**
 *
Module User
 */

export const callCreateUser = (
  fullname,
  email,
  phoneNumber,
  password,
  role,
  dateOfBirth,
  address
) => {
  return axios.post("/users", {
    fullname,
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
  fullname,
  email,
  phoneNumber,
  password,
  role,
  dateOfBirth,
  address
) => {
  return axios.put(`/users/${userId}`, {
    userId,
    fullname,
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

export const callFetchDoctor = () => {
  return axios.get("/users/doctors");
}
