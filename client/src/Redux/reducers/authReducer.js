import {
    
    LOGIN_USER,
    SET_LOADING,
    AUTH_ERROR,
    REGISTER_USER,
    GET_AUTH_USER,
    LOGOUT,
    GET_ALL_USERS

    
  } from "../constants/actionTypes";
  
  const initState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuth: false,
    isLoading: false,
    msg: null,
    isAdmin:0,
    users:[]
    
  };
  
  export default function authReducer(state = initState, { type, payload }) {
    switch (type) {
      case SET_LOADING:
        return { ...state, isLoading: true };
      case LOGIN_USER:
      case REGISTER_USER:
        localStorage.setItem("token", payload.token);
        return { ...state, isLoading: false, isAuth: true, ...payload,isAdmin:payload.user.role };
        case GET_AUTH_USER:
          return { ...state, isLoading: false, isAuth: true, user:payload.user,isAdmin:payload.user.role };
        case GET_ALL_USERS:
        return { ...state, isLoading: false, isAuth: true, users:[...payload] };
          case LOGOUT:
            case AUTH_ERROR:
              localStorage.removeItem("token");
              return {
                ...state,
                user: null,
                token: null,
                isAuth: false,
                isLoading: false,
                isAdmin:0,
                users:[]
            
              };
      default:
        return state;
    }
  }