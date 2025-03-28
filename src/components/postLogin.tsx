import axios from "axios";
import { EmployeeToLogin } from "../models/Employee";

export const postLogin = async (data: EmployeeToLogin) => {
  try {
    const response = await axios.post(
      "https://node-webrest-server-fin-seccion-production.up.railway.app/api/auth/login",
      data
    );
    if (response.status !== 200) {
      return null;
    }
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
  }
};
