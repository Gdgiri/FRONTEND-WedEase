import { combineReducers } from "redux";
import authReducer from "./authSlice"; // Ensure this path is correct

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
