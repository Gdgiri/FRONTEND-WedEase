import { combineReducers } from "redux";
import authReducer from "./authSlice";
import eventReducer from "./eventSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

export default rootReducer;
