
import React,{useEffect} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from './components/Dashboard/Dashboard';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAuthUser,getAllUsers } from "./Redux/actions/authActions";


function App() {
 const { isAuth } = useSelector((state) => state.authReducer);
 const { token } = useSelector((state) => state.authReducer);
 const { isAdmin } = useSelector((state) => state.authReducer);
 const dispatch = useDispatch();
 const getUser = () => dispatch(getAuthUser());
 
 useEffect(() => {
  if (token){
   getUser();
   }}, [token,dispatch]);

 const getUsers = () => dispatch(getAllUsers());
 useEffect(() => {
  if(isAdmin===1){
     getUsers()
}}
,[token, isAdmin, dispatch])


   return (
      <BrowserRouter>
      <Switch>
    <Route exact path="/" component={isAuth?Dashboard:Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      </Switch>
  </BrowserRouter> 
  );
}

export default App;
