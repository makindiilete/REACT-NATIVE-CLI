import apiClient from './client';

export const getContactsService = () => {
  return apiClient.get('/contacts/');
};
