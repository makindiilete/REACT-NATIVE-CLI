import {create} from 'apisauce';
import {envs} from '../config/env';
import * as storage from '../config/storage';
import {navigate} from '../navigations/RootNavigator';
import routes from '../constants/routes';

const apiClient = create({
  baseURL: envs().apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  //Now we can make use of our navigate method here without importing any hook
  navigate(routes.CREATE_CONTACT, {title: 'Michaelz'});
  let authToken = await storage.getToken();
  authToken = JSON.parse(authToken)?.value;
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
});

export default apiClient;
