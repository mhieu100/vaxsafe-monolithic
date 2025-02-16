import axios from "./axios-customize";

/**
 *
Module Order
 */

export const callOrder = (
    vaccineId,
    patientId,
    centerId,
    appointmentDate,
    appointmentTime,
    paymentType
  ) => {
    return axios.post(`/order?payment_method=${paymentType}`, {
      vaccineId,
      patientId,
      centerId,
      appointmentDate,
      appointmentTime
    });
  };
  