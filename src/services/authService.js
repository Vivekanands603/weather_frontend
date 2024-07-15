import axios from "axios";

const API_URL = "https://weather1-backend.vercel.app/api/auth";

const signUp = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      email,
      password,
    });
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

const signOut = () => {
  localStorage.removeItem("user");
};

const authService = {
  signUp,
  signIn,
  signOut,
};

export default authService;
