import apiClient from './client';

export const signupService = (data) => {
  return apiClient.post('/auth/register', data);
};

export const createContactService = (data) => {
  return apiClient.post(`/contacts/`, data);
};

export const loginService = (data) => apiClient.post('auth/login', data);
