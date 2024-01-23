const promisePool = require('../../config/databaseconnection')

exports.insertActivity = async (activityData) => {
    let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( ? ,? ,?  ) `;
    const [result] = await promisePool.query(sql,[activityData.activity_type,activityData.user_id,activityData.ip]);
    return result.insertId;
}
exports.getUsersDetails = async (email, bnb_address) => {
    let sql = `SELECT * FROM registration where email = ?`;
    const [result] = await promisePool.query(sql,[email]);
    return result;
}
exports.getUsersDetailsAddress = async (bnb_address) => {
    let sql = `SELECT * FROM registration where bnb_address = ?`;
    const [result] = await promisePool.query(sql,[bnb_address]);
    return result;
}

exports.demo = async (email) => {
    let sql = `SELECT * FROM registration where email = ? and id= ?`;
    const [result] = await promisePool.query(sql,[email, 645]);
    return result;
}

