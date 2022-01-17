import {create} from 'apisauce';
import {envs} from '../config/env';
import * as storage from '../config/storage';
import {navigate} from '../navigations/RootNavigator';
import routes from '../constants/routes';
import {removeFromStorage} from '../config/storage';
import {Alert} from 'react-native';

const apiClient = create({
  baseURL: envs().apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  //Now we can make use of our navigate method here without importing any hook
  // navigate(routes.CREATE_CONTACT, {title: 'Michaelz'});
  let authToken = await storage.getToken();
  authToken = JSON.parse(authToken)?.value;
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
  request.timeout = 15000;
});

// response interceptor to logout if we get 403 error (Invalid token or token not present)
apiClient.addAsyncResponseTransform(async (response) => {
  if (!response.ok) {
    if (response.problem === 'TIMEOUT_ERROR') {
      Alert.alert(
        'Oops',
        'Request taking too long, check your internet connection',
      );
    }
    if (response.status === 403) {
      navigate(routes.LOGOUT, {tokenExpired: true});
      await removeFromStorage('user');
      await removeFromStorage('token');
    } else {
      // Log to sentry....
    }
  }
});

export default apiClient;
