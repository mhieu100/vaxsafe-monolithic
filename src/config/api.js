import axios from "./axios-customize";

/**
 *
Module Auth
 */

export const callRegister = (
  fullName,
  email,
  password,
  phone,
  dateOfBirth,
  address
) => {
  return axios.post("/auth/register", {
    fullName,
    email,
    password,
    phone,
    dateOfBirth,
    address,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/auth/login", { username, password });
};

export const callFetchAccount = () => {
  return axios.get("/auth/account");
};

export const callRefreshToken = () => {
  return axios.get("/auth/refresh");
};

export const callLogout = () => {
  return axios.post("/auth/logout");
};

/**
 *
Module Center
 */

export const callCreateCenter = (
  name,
  address,
  phoneNumber,
  capacity,
  workingHours,
  image
) => {
  return axios.post("/centers", {
    name,
    address,
    phoneNumber,
    capacity,
    workingHours,
    image,
  });
};

export const callUpdateCenter = (
  centerId,
  name,
  address,
  phoneNumber,
  capacity,
  workingHours,
  image
) => {
  return axios.put(`/centers/${centerId}`, {
    name,
    address,
    phoneNumber,
    capacity,
    workingHours,
    image,
  });
};

export const callFetchCenter = (query) => {
  return axios.get(`/centers?${query}`);
};

export const callDeleteCenter = (id) => {
  return axios.delete(`/centers/${id}`);
};


/**
 * Upload single file
 */
export const callUploadSingleFile = (file, folderType) => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", file);
  bodyFormData.append("folder", folderType);

  return axios({
    method: "post",
    url: "/files",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
