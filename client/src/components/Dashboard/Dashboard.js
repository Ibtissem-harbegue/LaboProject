import React,{useState} from 'react'
import { useSelector } from "react-redux";

import { logout} from "../../Redux/actions/authActions";


import AdminProfile from './AdminProfile';
import UserProfile from './UserProfile'

function Dashboard() {
    
    
    const { isAdmin } = useSelector((state) => state.authReducer);
    const { user } = useSelector((state) => state.authReducer);
    const { users } = useSelector((state) => state.authReducer);
    const [search, setSearch] = useState("")
    
   
    return (
        <div>
            {isAdmin===0?
            <UserProfile user={user} logout={logout}/>:<AdminProfile users={users.filter( 
                user => user.name.toLowerCase().includes(search.toLowerCase().trim()) )} setSearch={setSearch} logout={logout}/>
           }
          
            
        </div>
    )
}

export default Dashboard
