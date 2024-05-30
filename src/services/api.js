const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
};

export const departmentEndpoints = {
  CREATE_DEPARTMENT_API: BASE_URL + "/department/createDepartment",
  EDIT_DEPARTMENT_API: BASE_URL + "/department/updateDepartment",
  DELETE_DEPARTMENT_API: BASE_URL + "/department/deleteDepartment",
  GET_ALL_DEPARTMENTS_API: BASE_URL + "/department/getAllDepartments",
}