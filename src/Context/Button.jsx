import React, { useContext, useEffect, useReducer, createContext } from "react";

const DarkContext = createContext({
  state: { theme: "light" },
  dispatch: () => {},
});

const DarkReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

const color = localStorage.getItem("theme");
const themeColor = color ? JSON.parse(color) : "light";

const initialValues = {
  theme: themeColor,
};

const DarkContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkReducer, initialValues);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state.theme || "light"));
  }, [state.theme]);

  return <DarkContext.Provider value={{ state, dispatch }}>{children}</DarkContext.Provider>;
};

export { DarkContext, DarkContextProvider };