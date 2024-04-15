const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    // res.send("All Ok");
    res.render("users/signup.ejs");
};

module.exports.signup=async(req, res) => {

    try{
     let {username,email, password} = req.body;
     const newUser=new User({email,username});
     const registerUser=await User.register(newUser, password);
     console.log(registerUser);
     req.login(registerUser,(err)=>{
      if(err)
      {
          return next(err);
      }
      req.flash("success", "Welcome to Wandelust Page!");
      res.redirect("/listings");
    });
    
    }
    catch(err){
      req.flash("error", e.message);
      res.redirect("/signup");
  
    }
  };

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};  

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are now logged in");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out");
        res.redirect("/listings");
    });
};