import React,{useState, useEffect} from 'react'
import {Bar, Pie} from 'react-chartjs-2'
import { Button, Form} from "react-bootstrap"
import { Col } from 'reactstrap';
import { IconContext } from "react-icons";
import {GoTrashcan} from "react-icons/go"
import {RiLogoutBoxRLine, RiCheckboxCircleLine} from "react-icons/ri"
import {FcStatistics} from "react-icons/fc"
import {FaChevronUp} from "react-icons/fa"
import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers,editUser } from "../../Redux/actions/authActions";
import "./CSS/AdminProfile.css"


const AdminProfile = ({setSearch,users,logout}) => {
  const dispatch = useDispatch();
   const [value,setValue]=useState('All')
  const [status,setStatus]=useState('')
  
  let total= users.length
  let  x = users.filter(e => e.status === "Positive").length;
  let  y = users.filter(e => e.status === "Negative").length;
  let  z = users.filter(e => e.status === "Not yet").length;
  
  const [graph, setGraph] = useState({})
  const [graphPie, setGraphPie] = useState({})
  const chart=()=>{
      setGraph ( {
          labels: ['Total','Pending','Positive', 'Negative'],
          datasets: [
              {
                  label: 'Patients Status',
                  data: [total, z, x, y],
                  backgroundColor: [
                    'rgba(153, 102, 255, 1)',        
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'      
        
                                ],
                  borderColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'      
                  ],
                  borderWidth: 2
              } ],
                            } );
        setGraphPie({
          labels: ['Pending','Positive', 'Negative'],
          datasets: [
              {
                  label: 'Patients Status',
                  data: [Math.round((z*100)/total), Math.round((x*100)/total), Math.round((y*100)/total)],
                  backgroundColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'      
                                ],
                  borderColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'                                    
                  ],
                  borderWidth: 4
              } ],
                            }
        );            
  }
  const options = {
      title:{
       display :true,
       text : "Patient Numbers By Status",
       fontSize : 35
      },
      legend:{
       position : "right"
      },
          scales: {
              yAxes: [{
                  ticks: {
                     min:0,
                     max:total,
                     stepSize :5
                  }
              }]
          }
      }
  const pieOptions = {
        title:{
         display :true,
         text : "Patients Status in %",
         fontSize : 35
        },
        legend:{
         position : "right"
        },           
        }
  
useEffect(() => {
  chart();
 }, [users])

     return (
       <>
        <section id="team" className="pb-5 ">
           < div style ={{display:"flex", marginBottom:"35px"}}>
           <h1 className="section-title h1">Patients List</h1>
     
<div className="stat_out">    
                  <a href="#statistics"><Button className="stat_btn" > 
               <IconContext.Provider value={{ color: "white", size:"2.5em" }}>
            < FcStatistics/> 
            </IconContext.Provider> 
            </Button></a>
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

            <h4 className={user.status!=='Not yet'?'description_task':''}>Test date: {user.test_date}</h4>
            <h4 className={user.status!=='Not yet'?'description_task':''} >Result date: {user.result_date}</h4>
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
      <IconContext.Provider  value={{ color: "black", className: "ok", size:"2em" }}>
  <RiCheckboxCircleLine  onClick={()=>{dispatch(editUser(user._id,{status} ));dispatch(getAllUsers())}} />
  </IconContext.Provider>
    </Form.Group> 
                        </div>
             </div>
          </div>    
    </div>   
 )}
 </div>
 <div id="statistics" >
            <h1 style={{color:" rgb(100, 131, 192)"}}>Statistics</h1>
            <div  >
    <Bar data={graph} options={options}/>   
            </div>
    <Pie data={graphPie} options={pieOptions}/>   
         </div>

         <a href="#team"><Button className="top_btn" > 
               <IconContext.Provider value={{ color: "white", size:"2.5em" }}>
            < FaChevronUp/> 
            </IconContext.Provider> 
            </Button></a>
       </section>
             </>
    )
}

export default AdminProfile;