import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  loading: false,
};

const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  reducers: {
    setDepartments(state, value) {
      state.departments = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setDepartments, setLoading } = departmentSlice.actions;

export default departmentSlice.reducer;
