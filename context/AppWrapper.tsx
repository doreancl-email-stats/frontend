import { createContext, useContext, useEffect, useReducer } from "react";

import { APP_STATE, AppReducer, initialState } from "./AppReducer";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const AppContext = createContext(undefined);

const { NEXT_PUBLIC_WITH_LOCAL_STORAGE } = process.env;

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    console.log("localStorage.getItem FIRST");
    if ("false" === NEXT_PUBLIC_WITH_LOCAL_STORAGE) {
      return;
    }
    try {
      if (JSON.parse(localStorage.getItem("state"))) {
        //checking if there already is a state in localstorage
        dispatch({
          type: "init_stored",
          value: JSON.parse(localStorage.getItem("state")),
          //if yes, update the current state with the stored one
        });
      }
    } catch (e) {}

    dispatch({
      type: "new_app_state",
      value: APP_STATE.READY
      //if yes, update the current state with the stored one
    });
  }, []);

  useEffect(() => {
    console.log("localStorage.setItem");
    const actualState = JSON.parse(localStorage.getItem("state"));

    const isLocalStorageEnabled = "false" === NEXT_PUBLIC_WITH_LOCAL_STORAGE;
    const hasStateCHanged = actualState != state;
    const isStateAndIsDiferentFromDefault = state && state !== initialState;

    if (
      isLocalStorageEnabled &&
      hasStateCHanged &&
      isStateAndIsDiferentFromDefault
    ) {
      const newState = { ...state };
      delete newState.timestamps;

      //create and/or set a new localstorage variable called "state"
      localStorage.setItem("state", JSON.stringify(newState));
    }
  }, [state]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
