import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import departmentSlice from "../slices/departmentSlice";

// All the slices will be combine here
const rootReducer = combineReducers({
  auth: authSlice,
  department: departmentSlice,
});

export default rootReducer;
