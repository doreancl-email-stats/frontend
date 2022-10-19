import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { AppReducer, initialState } from "./AppReducer";

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
  const [isMounted, setIsMounted] = useState(false);
  /*
    const contextValue = useMemo(() => {
      return [state, dispatch];
    }, [state, dispatch]);
  */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (false === isMounted) {
      return;
    }
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
  }, [isMounted]);

  useEffect(() => {
    if ("false" === NEXT_PUBLIC_WITH_LOCAL_STORAGE) {
      return;
    }
    if (state && state !== initialState) {
      delete state.timestamps;
      localStorage.setItem("state", JSON.stringify(state));
      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
