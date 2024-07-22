const {  saveHistory, allHistory, findHistoryById } = require("../Model/History.js")

const getAllHistory = async (req, res) => {
    try {
        const results = await allHistory();
        if (results) {
           return  res.status(200).json(results);
        }
        res.status(400).json({ error: "Failed to get all history" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const createHistory = async (req, res) => {
    const { ip } = req.body;

    console.log(ip);
    try {
        if (!ip) {
            return res.status(400).json({ error: "Please enter ip!" });
        }

        const result = await saveHistory(ip, new Date());
        if (result) {
            console.log(result);
            return res.status(200).json({
                success: `Create successful`,
            });
        }s
        res.status(400).json({ error: "Failed to create" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createHistory,
    getAllHistory
};
