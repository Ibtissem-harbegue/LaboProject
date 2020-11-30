import React from 'react'
import { useDispatch } from "react-redux";

function DashboardAdmin({user,logout,users}) {
    const dispatch = useDispatch();
   
    return (
        <div>
            <div><h3>{`Admin page ${user.name}` }</h3>
            {users.map((patient,index)=><h5 key={index}>{index} {patient.name}</h5>)}
           <button onClick={() => dispatch(logout())}>Logout</button></div>
        </div>
    )
}

export default DashboardAdmin
