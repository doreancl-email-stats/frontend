import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { AppReducer, initialState } from "./AppReducer";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const bla = useReducer(AppReducer, initialState);
  const [state, dispatch] = bla;

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
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
  }, [dispatch]);

  useEffect(() => {
    if (state && state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state));
      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);

  return <AppContext.Provider value={bla}>{children}</AppContext.Provider>;
}

export const useAppContext = (): any[] => useContext(AppContext);
