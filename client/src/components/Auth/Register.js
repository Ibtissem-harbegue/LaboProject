import React, {useState} from 'react';
import {Form,Button} from "react-bootstrap"
import { Col } from 'reactstrap';
import {Calendar} from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import "./RegisterLogin.css"
import { useDispatch } from "react-redux";
import { useHistory,Link } from "react-router-dom";
import { register } from "../../Redux/actions/authActions";


 const Register =() =>{
  const history = useHistory();
  const dispatch = useDispatch();
 
   //States
   
   const [date, setDate] = useState(new Date())
   const [reason, setReason] = useState("Severe Symptoms")
   
  
  
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    reason:reason,
    travel_date:date,
    age:""
    

  });
 
 
  

   //Functions
   
   const onChange =date =>{
     setDate(date)
     setNewUser({...newUser,travel_date:date})
   };
 
  const handleChange = (e) => {
   
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleConfirm = () => {
    dispatch(register(newUser));
    history.push("/");
    
  };

       return (
    <div className="register-form-container">
      <div  className="register-form">
     <Link to='/'><img style={{margin:"0px", height:"100px"}} src={"./flamenco-pandemic.png"} alt="corona"/></Link> 
      <h1 className="log">Create your account!</h1>
    <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridName" >
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter your Name"  onChange={handleChange}  name="name" />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridPhone">
      <Form.Label>Phone</Form.Label>
      <Form.Control type="text" placeholder="Enter your Phone" onChange={handleChange}  name="phone" />
    </Form.Group>
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col} controlId="formGridEmailR">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="name@example.com" onChange={handleChange}   name="email" />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridPasswordR">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={handleChange}   name="password"  />
    </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Reason</Form.Label>
      <Form.Control as="select"  onChange={(e)=>{const x= e.target.value; setReason(x);setNewUser({...newUser,reason:x}) }} name="reason">
        <option value="Severe Symptoms" >Severe Symptoms</option>
        <option value="Case of doubt">Case of doubt</option>
        <option value="Travelling"  >Travelling</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridPhone">
      <Form.Label>age</Form.Label>
      <Form.Control type="text" placeholder="Enter your age" onChange={handleChange}  name="age" />
    </Form.Group>
    </Form.Row>
   { reason === "Travelling"? 
   <div className="travel">
     <h3 >Date of Travel</h3>
   <Calendar className='calendar'  onChange={onChange} name="date" value={date}  /></div>
   :null}
    {/* { console.log(date.toString())} */}
    <div className="forgot-password">
            <Link className="forgotPasswordLink" to="/login">
You already have an account?  login</Link> 
          </div>
          <Button className="register-button" onClick={handleConfirm}> 
                Register
            </Button>
</Form>
</div>
    </div>
  )
}

export default Register;
