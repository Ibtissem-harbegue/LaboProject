const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/user");

// pase data
app.use(express.json());
// routes
app.use('/api',authRouter)

// connect DB
connectDB();
// run server
const port = process.env.PORT || 4900;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${port}`);
});
