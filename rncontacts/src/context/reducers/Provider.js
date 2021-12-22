import React from 'react';
import {createContext, useReducer} from 'react';
import {authReducer} from './authReducer';
import {authInitState} from '../initialStates/authInitState';
import {contactReducer} from './contactReducer';
import {contactInitState} from '../initialStates/contactInitState';

export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {
  //const [d current state, d dispatch function to set the state of d reducer] = useReducer(d_reducer, d initial state of d reducer

  const [authState, authDispatch] = useReducer(authReducer, authInitState);
  const [contactState, contactDispatch] = useReducer(
    contactReducer,
    contactInitState,
  );

  return (
    <GlobalContext.Provider
      value={{authState, contactState, authDispatch, contactDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};
