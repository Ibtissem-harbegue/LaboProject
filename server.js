const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/user");
const path =require("path")

// pase data
app.use(express.json());
// routes
app.use('/api',authRouter)

// connect DB
connectDB();


if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
    res.sendFile(__dirname,'../client','build','index.html');
  });
}

// run server
const port = process.env.PORT || 4900;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${port}`);
});

