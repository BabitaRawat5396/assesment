import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";

// All the slices will be combine here
const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;
