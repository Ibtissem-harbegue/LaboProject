const mongoose = require("mongoose");
const schema = mongoose.Schema;
var moment = require('moment');



const user = new schema({
  name: { type: String, required: [true,"Please enter your name"] },
  password: { type: String, required: [true,"Please enter your password"] },
  email: { type: String, required: [true,"Please enter your password"] },
  age: { type: Number, required: [true,"Please enter your age"] },
  phone: { type: Number,required:true},
  reason:{ type: String,required:[true,"Please enter your reason"] },
  travel_date :{ type: String,required:false },
  status:{ type: String,default:'Not yet' },
  declaration_date: {type: String,default:new Date() },
  test_date: {type: String,default:function() {
    if (this.reason==='Severe Symptoms') {
      return moment(this.declaration_date).add(1, 'days').format('dddd, MMMM Do YYYY') ;
    }
    else if (this.reason==='Case of doubt') {return moment(this.declaration_date).add(3, 'days').format('dddd, MMMM Do YYYY') 
  } 
  else { return moment(this.travel_date).subtract(3, 'days').format('dddd, MMMM Do YYYY')};
  }} ,
  result_date: {type: String,default:function() {
    if (this.reason==='Severe Symptoms') {
      return moment(this.declaration_date).add(2, 'days').format('dddd, MMMM Do YYYY') ;
    }
    else if (this.reason==='Case of doubt') {return moment(this.declaration_date).add(4, 'days').format('dddd, MMMM Do YYYY') 
  } 
  else { return moment(this.travel_date).subtract(2, 'days').format('dddd, MMMM Do YYYY')};
  }},
  role: { type: Number, default:0},
  
});



module.exports =  mongoose.model("user", user);
