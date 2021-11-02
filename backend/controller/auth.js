const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const { generateOTP, compareHash } = require("../utils/functions");


async function signup(req, res) {
//   const { sendOTP } = require("../utils/mailer");
console.log(req.body)
User.findOne({ email: req.body.email })
.exec((error, user) => {
    if (user) return res.status(400).json({ message: "user already registered" });

    const { name,email, password, conform_password, mobile_number, parent_ref_code } = req.body;
    if(password !== conform_password){
        return res.status(400).json({
            message: "Enter same password"})
    }

    const _user = new User({
        name,
        email,
        password,
        conform_password,
        parent_ref_code,
        mobile_number,
        user_id: Math.random().toString(),
    });
    _user.save((error, data) => {
    console.log(_user);
    if (error) {
        console.log(error)
        return res.status(400).json({
        message: "Somthing went wrong",
        });
    }
    if (data) {
        return res.status(201).json({
        message: "user created successfully",
        });
    }
    });
});
  }



async function signin(req, res) {
  const User = require("../models/user");
  try {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            // console.log(user.authenticate(req.body.password))
            if (user.authenticate(req.body.password)) {
                const { _id, name, email, role, fullName } = user;
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })


                res.status(200).json({
                    token,
                    user: {
                        _id, name, email, role
                    }
                })
            } else {
                return res.status(400).json({
                    message: "Invalide username and password"
                })
            }
        } else {
            return res.status(400).json({
                message: "Somthing went wrong"
            })
        }
    })
  } catch (error) {
    console.log(
      "Error: from: controller>auth.js>loginUser: ",
      error.message,
      error
    );
    return res.json({
      status: 400,
      error: true,
      message: "Something went wrong, please try again",
    });
  }
}



module.exports = {
    signup,
    signin,
 
};

//https://stackoverflow.com/questions/61291289/delete-the-associated-blog-posts-with-user-before-deleting-the-respective-user-i
