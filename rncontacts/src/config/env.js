const settings = {
  dev: {
    apiUrl: 'https://truly-contacts.herokuapp.com/api',
  },
  prod: {
    apiUrl: 'https://truly-contacts.herokuapp.com/api',
  },
};

export const envs = () => {
  if (__DEV__) {
    return settings.dev;
  } else {
    return settings.prod;
  }
};
