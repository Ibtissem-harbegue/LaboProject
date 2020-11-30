import React, {useState} from 'react'
import { Button,Modal,InputGroup, FormControl,Form} from "react-bootstrap"
import{Link} from "react-router-dom"
import { Col } from 'reactstrap';
import {Calendar} from "react-calendar"
import { IconContext } from "react-icons";
import {FaEdit} from "react-icons/fa"
import "./UserProfile.css"
import { useDispatch } from "react-redux";



const UserProfile=({user,logout})=> {
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState({
        name: "",
        phone: "",
        email: "",
          });
const [reason, setReason] = useState("")
const [date, setDate] = useState(new Date());


const onChange = date =>{
    setDate(date);
};    
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
        ...newUser,
        [name]: value,
    });
};


    return (
        <div className="all">
            <h1>Patient Profile</h1>
            <button onClick={() => dispatch(logout())}>Logout</button>  
                <div className="profile">
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img alt="details" style={{marginLeft:"90px"}} src="https://cdn.iconscout.com/icon/premium/png-512-thumb/business-card-name-profile-info-1-49991.png" />
                <h3>Patient Details</h3>
              <IconContext.Provider value={{ color: "black", className: "edit", size:"2em" }}>
  <FaEdit onClick={handleShow}  style = { {marginLeft:"230px"}} />
</IconContext.Provider >   
              </div>
            </div>
            <div className="face face2">
              <div className="content">
    <h4>name: {user.name}</h4>
            <h4>email: {user.email}</h4>
            <h4>phone: {user.phone}</h4>
            <h4>reason: {user.reason}</h4>
            { user.reason === "Travelling"? 
   <div className="travel">
     <h4>travel date :{user.travel_date}</h4></div>
   :null}
          
                             </div>
            </div>
          </div>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img alt="dates" style={{marginLeft:"46px", height:"120px"}} src="https://cdn1.iconfinder.com/data/icons/startup-and-new-business-glyph/64/Calendar-512.png" />
                <h3>Test & Result Dates</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
    <h4>Test Date :{user.test_date}</h4>
            <h4>Result Date: {user.result_date}</h4> 
              </div>
            </div>
          </div>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img alt="status" style={{height:"120px"}} src="https://cdn0.iconfinder.com/data/icons/medical-health-3/474/Experiment_Results-512.png" />
                <h3>Result</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
    <h4>Result: {user.status}</h4>
               <Link to="result">View your results report</Link>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update your informations</Modal.Title>
              </Modal.Header>
              <Modal.Body>
 <InputGroup size="sm" className="mb-3">
       <FormControl placeholder="Name"  onChange={handleChange} value={user.name} name="name"  aria-label="Small" aria-describedby="inputGroup-sizing-sm"  />
       <FormControl placeholder=" Email"  onChange={handleChange} value={user.email} name="email" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
  </InputGroup>
  <br />
  <InputGroup size="sm" className="mb-3">
       <FormControl placeholder="Phone"  onChange={handleChange} value={user.phone} name="phone" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
       <Form.Row>
        <Form.Group as={Col} controlId="formGridState">
      <Form.Control as="select" onChange={(e)=>{const x= e.target.value; setReason(x); }}>
        <option value="Severe Symptoms" >Severe Symptoms</option>
        <option value="Case of doubt">Case of doubt</option>
        <option value="Travelling"  >Travelling</option>
      </Form.Control>
    </Form.Group>
    </Form.Row>
   { reason === "Travelling"? 
   <div className="travel">
     <h3 >Date of Travel</h3>
   <Calendar className='calendar'  onChange={onChange} name="date" value={user.date}  /></div>
   :null}
         </InputGroup>  
        
</Modal.Body>
              <Modal.Footer>
                <Link>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
                </Link>
              </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserProfile;