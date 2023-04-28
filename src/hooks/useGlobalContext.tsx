import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useGlobalContext = () => {
  return useContext(AppContext);
};
