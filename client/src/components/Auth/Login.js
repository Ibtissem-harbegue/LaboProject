import React, {useState} from 'react';
import {Form , Button} from "react-bootstrap"
import { Col } from 'reactstrap';
import "./RegisterLogin.css"
import { login } from "../../Redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useHistory,Link } from "react-router-dom";


 const Login =() =>{
  let history = useHistory();
  const dispatch = useDispatch();
  
  
  const [newUser, setNewUser] = useState({
    password: "",
       email: "",
     });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleConfirm = () => {
    dispatch(login(newUser));
    history.push('/')   
  };

       return (
         <>
    <div className="login_form">
          <Link to='/'><img style={{margin:"0px", height:"100px"}} src={"./flamenco-pandemic.png"} alt="corona"/></Link> 
      <h1 className="log">Log In</h1>
      <div  className="login-form">

    <Form>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridEmailL">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="name@example.com" onChange={handleChange}   name="email" />
    </Form.Group>
         </Form.Row>
      <Form.Row>
         <Form.Group as={Col} controlId="formGridPasswordL">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={handleChange}   name="password"  />
    </Form.Group>
      </Form.Row>
     <div className="forgot-password">
            <Link className="forgotPasswordLink" to="/register">
You don't have an account?  register</Link>
          </div>
          <Button className="register-button" onClick={handleConfirm}> 
               Login
            </Button>
</Form>
</div>
    </div>
    </>
  )
}

export default Login;
