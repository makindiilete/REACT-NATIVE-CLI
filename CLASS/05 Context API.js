/*
Now we want to setup our context api using action dispatch and useReducer
*/

//Provider.js
import React from "react";
import { createContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { authInitState } from "../initialStates/authInitState";
import { contactReducer } from "./contactReducer";
import { contactInitState } from "../initialStates/contactInitState";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  //const [d current state, d dispatch function to set the state of d reducer] = useReducer(d_reducer, d initial state of d reducer

  const [authState, authDispatch] = useReducer(authReducer, authInitState);
  const [contactState, contactDispatch] = useReducer(
    contactReducer,
    contactInitState
  );

  return (
    <GlobalContext.Provider
      value={{ authState, contactState, authDispatch, contactDispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//initialStates/authInitState.js
export const authInitState = {
  isLoggedIn: false,
  data: {},
  error: null,
  loading: false,
};

//reducers/authReducer.js
export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {};

    default:
      return state;
  }
};

//contactInitState.js
export const contactInitState = {
  getContacts: {
    data: {},
    error: null,
    loading: false,
  },
  createContacts: {
    data: {},
    error: null,
    loading: false,
  },
  deleteContacts: {
    data: {},
    error: null,
    loading: false,
  },
};

//reducers/contactReducer.js
export const contactReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_CONTACTS":
      return {};

    default:
      return state;
  }
};

//App.js
import "react-native-gesture-handler";
import React from "react";
import { AppNavContainer } from "./src/navigations/AppNavContainer";
import { GlobalProvider } from "./src/context/reducers/Provider";

const App = () => {
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;

//AppNavContainer.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { GlobalContext } from "../context/reducers/Provider";

export function AppNavContainer() {
  const state = useContext(GlobalContext);
  const { isLoggedIn } = state?.authState;
  console.log("state = ", state);
  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
