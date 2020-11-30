import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_ERROR,
  SET_LOADING,
  GET_AUTH_USER,
  LOGOUT,
  GET_ALL_USERS

  
} from "../constants/actionTypes";

// register user

export const register = (newUser) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/api/register", newUser);

    dispatch({
      type: REGISTER_USER,
      payload: res.data, //  { msg: "register Success", user, token }
    });
  } catch (error) {
    console.dir(error);
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (newUser) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.post("/api/login", newUser);

    dispatch({
      type: LOGIN_USER,
      payload: res.data, //  { msg: "Login Success", user, token }
    });
  } catch (error) {
    console.dir(error);
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const getAuthUser = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    const res = await axios.get("/api/profile", options);

    dispatch({
      type: GET_AUTH_USER,
      payload:  res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const getAllUsers = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    const res = await axios.get("/api/profiles", options);

    dispatch({
      type: GET_ALL_USERS,
      payload:  res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};