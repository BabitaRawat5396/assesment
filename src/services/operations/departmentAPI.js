import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { departmentEndpoints } from "../api";
import { toast } from "react-hot-toast";

const {
  CREATE_DEPARTMENT_API,
  EDIT_DEPARTMENT_API,
  DELETE_DEPARTMENT_API,
  GET_ALL_DEPARTMENTS_API,
} = departmentEndpoints;

export function createDepartment(departmentData, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        CREATE_DEPARTMENT_API,
        { name: departmentData },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Department Created Successfully");
    } catch (error) {
      console.log("CREATE_DEPARTMENT_API_ERROR", error);
      toast.error("Unable to Create Department");
    }
    dispatch(setLoading(false));
  };
}

export function updateDepartment(departmentData, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        EDIT_DEPARTMENT_API,
        departmentData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Department Updated Successfully");
    } catch (error) {
      console.log("UPDATE_DEPARTMENT_API_ERROR", error);
      toast.error("Unable to Update Department");
    }
    dispatch(setLoading(false));
  };
}

export function deleteDepartment(departmentId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_DEPARTMENT_API,
        { id: departmentId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Department Deleted Successfully");
    } catch (error) {
      console.log("DELETE_DEPARTMENT_API_ERROR", error);
      toast.error("Unable to Delete Department");
    }
    dispatch(setLoading(false));
  };
}

export const fetchAllDepartments = async (token) => {
  setLoading(true);
  let result = [];

  try {
    const response = await apiConnector("GET", GET_ALL_DEPARTMENTS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("FETCH_ALL_DEPARTMENTS_API_ERROR", error);
    toast.error("Couldn't fetch departments");
  }
  setLoading(false);
  return result;
};
