import { createContext, useContext } from "react";
import wordStore from "./WordStore";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={wordStore}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
