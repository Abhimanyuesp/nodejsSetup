const response = require('../../shared_modules/response')

exports.mobilelogin = async (req, res) => {
    try { 
        res.send(response(200, true, "success", {id:123, text: "dummy logged in"}))
    } catch (error) {
        res.send(response())
    }
}