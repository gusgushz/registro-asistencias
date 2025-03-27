import axios from "axios";
import { NewEmployee } from "../models/Employee";

export const postRegister = async (data: NewEmployee) => {
  try {
    const response = await axios.post(
      "https://node-webrest-server-fin-seccion-production.up.railway.app/api/auth/register",
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
