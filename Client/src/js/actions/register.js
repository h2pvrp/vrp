import { REGISTER_USER } from "../constants/action-types";

export function register(userData) {
  return {
    type: REGISTER_USER,
    userData
  };
}
