const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/user");

//4- pase data
app.use(express.json());
//3- routes
app.use('/api',authRouter)

//2- connect DB
connectDB();
//1-run server
const port = process.env.PORT || 4900;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${port}`);
});
