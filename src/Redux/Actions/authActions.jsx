import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL_REGISTER = "http://localhost:5000/api/auth/register";
const API_URL_LOGIN = "http://localhost:5000/api/auth/login";

// Register User

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL_REGISTER, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL_LOGIN, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.mesage || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch }) => {
      // Optionally, handle any asynchronous logic here
      // For example, if you have an API endpoint to log out
      // await axios.post('/api/logout');
  
      // Dispatch the logout action to clear user data
      dispatch({ type: "auth/logout" }); // Dispatch a synchronous logout action
    }
  );