import apiClient from './client';

export const signupService = (data) => {
  return apiClient.post('/auth/register', data);
};
