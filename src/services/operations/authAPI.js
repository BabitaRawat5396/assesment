import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { setLoading, setToken, setUser } from "../../slices/authSlice";

const { LOGIN_API } = endpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      // console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      }else{
        toast.error("Unauthorized route");
      }
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
