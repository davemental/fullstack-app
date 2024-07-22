const { getConnection } = require('../config/dbConn.js');

const findHistoryById = async (Invalid) => {
    try {

        const conn = await getConnection();
        const results = await conn.query(`SELECT * FROM history WHERE id='${id}'`);

        if (results) {
            return results[0];
        }
        return null;
        
    } catch (error) {
        console.log(error);
    }
}   

const allHistory = async () => {
    try {

        const conn = await getConnection();
        const results = await conn.query("SELECT * FROM history");
        if (results) {
            return results;
        }
        return null;
        
    } catch (error) {
        console.log(error);
    }
}   


const saveHistory = async (ip, date) => { 
    try {

        const conn = await getConnection();
        const results = await conn.query(`INSERT INTO history(ip, created_at) values('${ip}', '${date}')`);

        if (results) {
            return results;
        }
        return null;
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    allHistory,
    saveHistory,
    findHistoryById
};