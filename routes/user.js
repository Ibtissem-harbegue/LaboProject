const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('config');
const { registerRules,loginRules, validator } = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');
const isAuthAdmin = require('../middlewares/isAuthAdmin');

const secretOrKey = config.get('secretOrKey');

//register

router.post("/register",registerRules(),validator, async (req, res) => {
    const { name, email, password,reason,phone,travel_date,age } = req.body;
    try {
        //find if the user already exists
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).send({ msg: "User Already exists" });
        }
    
        //create a new user
        user = new User({
          name,
          email,
          password,
          reason,
          phone,
          travel_date,
          age
        });
    
        //hash the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
    
        user.password = hashedPassword;
    
        //save the user
        await user.save();
        //sign the user
    
        const payload = {
          _id: user._id,
        };
    
        const token = await jwt.sign(payload,secretOrKey);
    
        res.status(200).send({ msg:'register success',user, token});

    } catch (error) {
      res.status(500).send({ msg: "Server error" });
    }
  });


//login
  router.post("/login",loginRules(),validator, async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ msg: "Bad Credentials email" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).send({ msg: "Bad Credentials password" });
      }
  
      //sign the user
  
      const payload = {
        _id: user._id,
      };
  
      const token = await jwt.sign(payload,secretOrKey);
  
      res.send({ msg: "login Success", user, token });
    } catch (error) {
      res.status(500).send({ msg: "Server error" });
    }
  });

  //profile

  router.get("/profile", isAuth, (req, res) => {
    
    res.status(200).send({ user: req.user });
  });


  //get all patients

  router.get('/profiles',isAuth,isAuthAdmin, async (req, res) => {
    try {
        const users = await User.find({role:0}).select('-password')

        res.json(users)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}, )

//Update user

router.put("/:_id",isAuth, (req, res) => {
  let { _id } = req.params;
  User.findByIdAndUpdate({ _id }, { $set: { ...req.body } })
    .then(() => res.send("updated success"))
    .catch((err) => res.send(err));
});

//delete user

router.delete("/:_id",isAuth,isAuthAdmin, (req, res) => {
  let { _id } = req.params;
  User.findByIdAndDelete({ _id })
    .then(() => res.send("deleted success"))
    .catch((err) => res.send(err));
});



  module.exports = router;