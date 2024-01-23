const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");

const response = require("../../shared_modules/response");
const {  verifyWalletAddress} = require("../../shared_modules/verifywalletaddress");
const authModel = require("../../model/webapplication/authModel");

exports.demo = async (req, res) => {
  try {
    let result = await authModel.demo(req.body.email);
    if (result.length) {
      return res.send(response(200, true, "success", result));
    } else {
      return res.send(response(200, false, "failed!"));
    }
  } catch (error) {
    res.send(response());
  }
};

exports.weblogin = async (req, res) => {
  try {
    const verifyAddress = await verifyWalletAddress(
      req.body.address,
      req.body.signature
    );
    if (!verifyAddress.status) {
      return res.send(response(200, false, verifyAddress.message));
    } else {
      let getUsersEmail = await authModel.getUsersDetailsAddress(
        req.body.address
      );
      if (getUsersEmail.length > 0) {
        if (getUsersEmail[0].is_active == 0) {
          return res.status(200).send({
            success: false,
            msg: "Your account is Deactivated, Please contact Admin.",
          });
        }
        // if (getUsersEmail[0].is_email_verify === 0) {
        //     return res.status(200).send({
        //         success: false,
        //         msg: "Please activate your account"
        //     });
        // } else if (getUsersEmail[0].is_active == 0) {
        //     return res.status(200).send({
        //         success: false,
        //         msg: "Your account is Deactivated, Please contact Admin."
        //     });
        // } else {
        const jwtToken = jwt.sign(
          {
            email: getUsersEmail[0].email,
            id: getUsersEmail[0].id,
            bnb_address: getUsersEmail[0].bnb_address,
          },
          process.env.JWTSECRETKEY,
          { expiresIn: process.env.JWTSESSIONTIMEOUT }
        );

        // Insert Activity
        let activityInserted = await authModel.insertActivity({
          user_id: getUsersEmail[0].id,
          activity_type: "Login",
          ip: requestIp.getClientIp(req),
        });
        if (activityInserted) {
          return res.send(
            response(200, true, "Login Successful", {
              id: getUsersEmail[0].id,
              email: getUsersEmail[0].email,
              bnb_address: getUsersEmail[0].bnb_address,
              authToken: jwtToken,
            })
          );
        } else {
          return res.send(response(200, false, "Something went wrong!"));
        }
        // }
      } else {
        return res.send(response(200, false, "failed!"));
      }
    }
  } catch (error) {
    res.send(response());
  }
};

exports.adminlogin = async (req, res) => {
  try {
    res.send(
      response(200, true, "success", { id: 123, email: "admin@gmail.com" })
    );
  } catch (error) {
    res.send(response());
  }
};
