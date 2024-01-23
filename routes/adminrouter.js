const express = require('express');
const router = express.Router();
const {overallLimit}= require('../utils/ratelimit')
const access = require('../controller/webapplication/accessController')


router.use(overallLimit)
router.get('/login',access.adminlogin);

// const { ensureWebToken } = require('../../middleware/jwt/jwtUser');
// router.use(ensureWebToken)

router.get('/abc', function (req, res) {
        res.send("node is inside abc")});

        
module.exports = router;