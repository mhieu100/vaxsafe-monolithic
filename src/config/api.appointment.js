import axios from "./axios-customize";

/**
 *
Module Order
 */

export const callAddAppointment = (
  vaccineId,
  patientId,
  centerId,
  appointmentDate,
  appointmentTime,
  paymentType
) => {
  return axios.post(`/appointments?payment_method=${paymentType}`, {
    vaccineId,
    patientId,
    centerId,
    appointmentDate,
    appointmentTime
  });
};

export const callUpdateAppointment = (appointmentId, doctorId) => {
  return axios.put(`/appointments/${appointmentId}`,
    {
      doctorId
    });
};



export const callFetchAppointment = (query) => {
  return axios.get(`/appointments?${query}`);
};

