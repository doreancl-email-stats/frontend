import { createContext, useContext, useEffect, useReducer } from "react";
import { APP_STATE, AppReducer, initialState } from "./AppReducer";
import { isLocalStorageEnabled } from "../config";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    console.log("localStorage.getItem FIRST", { isLocalStorageEnabled });
    if (isLocalStorageEnabled) {
      try {
        if (
          isLocalStorageEnabled &&
          JSON.parse(localStorage.getItem("state"))
        ) {
          //checking if there already is a state in localstorage
          dispatch({
            type: "init_stored",
            value: JSON.parse(localStorage.getItem("state")),
            //if yes, update the current state with the stored one
          });
        }
      } catch (e) {}
    }

    dispatch({ type: "new_app_state", value: APP_STATE.READY });
  }, [isLocalStorageEnabled]);

  useEffect(() => {
    console.log("localStorage.setItem", { isLocalStorageEnabled });
    if (!isLocalStorageEnabled) {
      return;
    }
    const actualState = JSON.parse(localStorage.getItem("state"));

    const hasStateCHanged = actualState != state;
    const isStateAndIsDiferentFromDefault = state && state !== initialState;

    if (hasStateCHanged && isStateAndIsDiferentFromDefault) {
      const newState = { ...state };
      delete newState.timestamps;

      //create and/or set a new localstorage variable called "state"
      localStorage.setItem("state", JSON.stringify(newState));
    }
  }, [isLocalStorageEnabled, state]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
