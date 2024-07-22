const { getConnection } = require('../config/dbConn.js');

const findUserByEmail = async (email) => {
    try {

        const conn = await getConnection();
        const results = await conn.query(`SELECT * FROM users WHERE email='${email}'`);

        if (results) {
            return results[0];
        }
        return null;
        
    } catch (error) {
        console.log(error);
    }
}   

const findUserByToken = async (token) => { 
    try {

        const conn = await getConnection();
        const results = await conn.query(`SELECT * FROM users WHERE refreshToken='${token}'`);

        if (results) {
            return results[0];
        }
        return null;
        
    } catch (error) {
        console.log(error);
    }
}

const updateRefreshToken = async (id, token) => {
    try {
        const conn = await getConnection();
        const result = await conn.query(`UPDATE users SET refreshToken='${token}' WHERE id=${id}`);

        if (result) {
            return result
        }
        return null;
        
    } catch (error) {
        console.log(error);
    }
}   

module.exports = {
    findUserByEmail,
    updateRefreshToken,
    findUserByToken
};