const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/user");
const path = require("path");

// pase data
app.use(express.json());
// routes
app.use('/api',authRouter)


//serve static assets if in production
if (process.env.Node_ENV === 'production'){
  //set static folder
  app.use('/',express.static(path.join(__dirname,'../client/build')));

  app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'../client/build','index.html'))
  });
}

// connect DB
connectDB();
// run server
const port = process.env.PORT || 4900;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${port}`);
});
