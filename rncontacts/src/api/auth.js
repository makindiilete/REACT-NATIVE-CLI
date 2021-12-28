import apiClient from './client';

export const signupService = (data) => {
  return apiClient.post('/auth/register', data);
};

export const loginService = (data) => apiClient.post('auth/login', data);
