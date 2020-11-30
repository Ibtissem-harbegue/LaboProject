import React,{useState,useEffect} from 'react'
import { useDispatch } from "react-redux";






function DashboardPatient({user,logout}) {
  
  
    const dispatch = useDispatch();
   var  {name,phone,reason,test_date,travel_date,result_date,status}=user
   
    
     
   
   
    return (
        
         <div>
           
             <h3>Patient page </h3>
             <h2>name :{name} </h2>
             <h4>{phone}</h4>
             <h4>reason :{reason}</h4>
             { reason === "Travelling"? 
   <div className="travel">
     <h4>travel date :{travel_date}</h4></div>
   :null}
             
             
             <h4>test date:{test_date}</h4>
             <h4>result date:{result_date}</h4>
        
             
             <h4>{status}</h4>
         
           <button onClick={() => dispatch(logout())}>Logout</button>  
        </div>
    )
}

export default DashboardPatient
