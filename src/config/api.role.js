import axios from './axios-customize';

/**
 *
Module Role
 */

export const callFetchRole = (query) => {
  return axios.get(`/roles?${query}`);
};


