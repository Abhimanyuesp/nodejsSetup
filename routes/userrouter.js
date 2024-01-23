const express = require('express');
const router = express.Router();
const {overallLimit}= require('../utils/ratelimit')
const accessController = require('../controller/webapplication/accessController')
const mobileaccessController = require('../controller/mobileapp/authaccess')
const authValidator = require('..//middleware/authvalidator')

router.use(overallLimit)
router.post('/demo',accessController.demo);

const { ensureWebToken } = require('../utils/auth/jwtUser');
router.use(ensureWebToken)

router.post('/weblogin',authValidator.validateUserRequest,accessController.weblogin);
router.get('/applogin', mobileaccessController.mobilelogin );



        
module.exports = router;