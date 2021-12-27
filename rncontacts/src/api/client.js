import {create} from 'apisauce';
import {envs} from '../config/env';
import * as storage from '../config/storage';

const apiClient = create({
  baseURL: envs().apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await storage.getToken();
  if (authToken) {
    request.headers['Authorization'] = `Bearer ${authToken}`;
  }
});

export default apiClient;
