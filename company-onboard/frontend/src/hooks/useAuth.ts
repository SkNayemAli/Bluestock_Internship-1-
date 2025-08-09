import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAuth = () => {
  return useSelector((s: RootState) => s.auth);
};
