import React,{useEffect,useState} from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout} from "../../Redux/actions/authActions";
import { getAllUsers } from "../../Redux/actions/authActions";

import AdminProfile from './AdminProfile';
import UserProfile from './UserProfile'
function Dashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer);
    const { users } = useSelector((state) => state.authReducer);
    const { isAdmin } = useSelector((state) => state.authReducer);
    const { token } = useSelector((state) => state.authReducer);
 const getUsers = () => dispatch(getAllUsers());

    useEffect(() => {
        if(isAdmin===1){
           getUsers()
    }}
    ,[token, isAdmin, dispatch])
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
