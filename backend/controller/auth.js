const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../utils/functions");
const { sendOTP } = require("../utils/mailer");
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

    const otp = generateOTP();
    if (!otp) {
      return res.json({
        status: 400,
        error: true,
        message: "Something went wrong!",
      });
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
    
    sendOTP(email, otp);
    return res.json({
      status: 200,
      error: false,
      params: {
        ev: false,
      },
      message: "User is registered and varification otp sent to his mail",
    });
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
                const { _id, name, email, role } = user;
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

async function verifyUserEmail(req, res) {
    const { verifyOTP } = require("../utils/validator");
    const { createUserWallets } = require("../utils/function.wallets");
    const Wallets = require("../models/wallets");
    const OtpBuffer = require("../models/otp_buffer");
    const OTP_LENGTH = 6;
    try {
      const { user_id, otp } = req.body;
      if (user_id && otp && otp.toString().length == OTP_LENGTH) {
        const user_status = await validateUserId(user_id);
        if (user_status) {
          const otp_object = await OtpBuffer.findOne({ user_id: user_id });
          if (otp_object) {
            if (otp_object.email_otp) {
              if (verifyOTP(otp_object.email_otp, otp, 5)) {
                await OtpBuffer.updateOne(
                  { user_id: user_id },
                  {
                    $set: {
                      email_otp: null,
                    },
                  }
                );
                await User.updateOne(
                  { user_id: user_id },
                  {
                    $set: {
                      is_email_verified: true,
                    },
                  }
                );
                const user_wallet = await Wallets.findOne({
                  user: user_id,
                  wallet_type: "BTC",
                });
                if (user_wallet && user_wallet.wallet_address) {
                  console.log("Allready created!");
                } else {
                  /**
                   * address creation
                   */
                  const iscreated = await createUserWallets(user_id);
                  if (iscreated) console.log("Wallets Created!");
                  else console.log("Wallets couldn't");
                }
  
                return res.json({
                  status: 200,
                  error: false,
                  params: {
                    ev: true,
                    user_id: user_id,
                  },
                  message: "OTP varified",
                });
              } else {
                return res.json({
                  status: 400,
                  error: true,
                  message: "Invalid OTP",
                });
              }
            } else {
              return res.json({
                status: 400,
                error: true,
                message: "Invalid OTP",
              });
            }
          } else {
            return res.json({
              status: 400,
              error: true,
              message: "Invalid Request",
            });
          }
        } else {
          return res.json({
            status: 400,
            error: true,
            message: "Invalid request",
          });
        }
      } else {
        return res.json({
          status: 400,
          error: true,
          message: "Invalid OTP",
        });
      }
    } catch (error) {
      console.log(
        "Error: from: src>controller>auth.js>verifyUserEmail: ",
        error.message
      );
      return res.json({
        status: 400,
        error: true,
        message: "Something went wrong, please try again!",
      });
    }
  }

module.exports = {
    signup,
    signin,
    verifyUserEmail,
 
};

//https://stackoverflow.com/questions/61291289/delete-the-associated-blog-posts-with-user-before-deleting-the-respective-user-i
