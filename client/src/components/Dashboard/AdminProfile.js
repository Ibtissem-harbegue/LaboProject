import React,{useState} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import axios from "axios"
import { Button, Form} from "react-bootstrap"
import { Col } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";

import { IconContext } from "react-icons";
import {GoTrashcan} from "react-icons/go"
import {FaEdit} from "react-icons/fa"
import {RiLogoutBoxRLine} from "react-icons/ri"

import {FcStatistics} from "react-icons/fc"
import "./CSS/AdminProfile.css"
import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers,editUser } from "../../Redux/actions/authActions";


const AdminProfile = ({setSearch,users,logout}) => {

  const history = useHistory();
  const dispatch = useDispatch();
        
  const [value,setValue]=useState('All')
  const [status,setStatus]=useState('')
  
 

    
    return (
       <>

        <section id="team" className="pb-5 ">
           < div style ={{display:"flex", marginBottom:"35px"}}>
           <h1 className="section-title h1">Patients List</h1>
     
<div className="stat_out">    
                  <Button className="stat_btn" onClick={(e)=>{history.push("/stat");dispatch(getAllUsers())}} > 
               <IconContext.Provider value={{ color: "white", size:"2.5em" }}>
            < FcStatistics/> 
            </IconContext.Provider> 
            </Button>
               <Button className="logout_btn"  onClick={() => dispatch(logout())}   > 
               <IconContext.Provider value={{ color: "white", size:"2.5em" }}>
            < RiLogoutBoxRLine/> 
            </IconContext.Provider> </Button>     </div>        
</div>
<div className="filter">
           <label>
All
               <input type='radio' value='All' checked={value==='All'} onChange={(e)=>setValue(e.target.value)} />
           </label>
           <label>
Positive
               <input type='radio' value='Positive' checked={value==='Positive'}  onChange={(e)=>setValue(e.target.value)}  />
           </label>
           <label>
Negative
               <input type='radio' value='Negative' checked={value==='Negative'}  onChange={(e)=>setValue(e.target.value)}  />
           </label>
           <label>
Not yet
               <input type='radio' value='Not yet' checked={value==='Not yet'}   onChange={(e)=>setValue(e.target.value)} />
           </label>
           
    
<div action className="search">  
          <div className="field">
            <input type="text" className="input-search" id="input-search" name="input-search" required
             onChange={(e)=>setSearch(e.target.value)}/>
            <label htmlFor="input-search">Search</label>
          </div> 
        </div>
      
</div>
<div className="list">
{(value==='All'?users:users.filter(el=>el.status===value)).map((user,id) =>
               <div   key={id}>
            <div className="card">
            <div className="face face1">
              <div className="content">
                       <IconContext.Provider  value={{ color: "red", className: "trash", size:"2em" }}>
  <GoTrashcan  onClick={()=>dispatch(deleteUser(user._id))} />
  </IconContext.Provider>
                <img style={{width:"75px",borderRadius: "50px",marginTop: "-50px", marginLeft: "150px" }} src="https://image.shutterstock.com/z/stock-vector-blank-avatar-placeholder-on-transparent-background-1097191784.jpg" alt="profile-sample4" className="profile" />
            <h4 className="name">Name: {user.name}</h4>
            <h4>Result: {user.status} </h4>
            <h4>Reason: {user.reason} </h4>
            <h4>Test date: {user.test_date}</h4>
            <h4>Result date: {user.result_date}</h4>
                       </div>
            </div>
            <div className="face face2">
              <div className="content">
            <h4>Email: {user.email}</h4>
            <h4>Phone: {user.phone}</h4>
            <h4>Age: {user.age} years old</h4>
            <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Result</Form.Label>
      <Form.Control as="select" value={user.status}   onChange={(e)=>{const x= e.target.value; setStatus(x)}} name="result">
        <option value="Not yet">Not yet</option>
        <option value="Positive">Positive</option>
        <option value="Negative"  >Negative</option>
      </Form.Control>
      <button onClick={()=>{dispatch(editUser(user._id,{status} ));dispatch(getAllUsers())}}>ok</button>
    </Form.Group> 
                        </div>
             </div>
          </div>    
    </div>   
 )}
 </div>
       </section>
             </>
       
                        
    )
}

export default AdminProfile