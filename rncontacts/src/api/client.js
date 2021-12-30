import {create} from 'apisauce';
import {envs} from '../config/env';
import * as storage from '../config/storage';

const apiClient = create({
  baseURL: envs().apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  let authToken = await storage.getToken();
  authToken = JSON.parse(authToken)?.value;
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
});

export default apiClient;
