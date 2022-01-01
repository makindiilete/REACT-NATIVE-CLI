import React from 'react';

export const navigationRef = React.createRef();

/*we will be using this navigate method inside functions where we do not have access to the useNavigation hook */
export const navigate = (screenName, params) => {
  navigationRef.current?.navigate(screenName, params);
};
