import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return value;
}
