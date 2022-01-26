import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
//1.dispatch action
//2. reducer
//3.update states
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
   //const [state, dispatch] = useReducer(AuthContext, INITIAL_STATE);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE); //reducer is used here
 
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); //set user locally 
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
