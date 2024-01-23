require('dotenv').config();
const jwt = require('jsonwebtoken')
const authModel = require('..//../model/webapplication/authModel');

function ensureWebToken(req, res, next) {
    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWT(req, res, next);
    } else {
        res.sendStatus(403);
    }
}

async function verifyJWT(req, res, next) {
    try{
    jwt.verify(req.token, process.env.JWTSECRETKEY, async function (err, data) {
        if (err) {
           // console.log(err);
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.user = _data['payload'];
            req.user_id = req.user.id;
            req.email = req.user.email;
            req.bnb_address = req.user.bnb_address;
            // check if user is active or not 
            let userDetails = await authModel.getUsersDetails(req.user.email);
          
            if (userDetails[0].is_active == 0) {
                return res.sendStatus(403);
            } else {
                next();
            }
        }
    })
} catch (error) {
    return res.sendStatus(401);
}
}


module.exports = { ensureWebToken }