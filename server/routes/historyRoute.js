const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const {createHistory, getAllHistory } = require("../controllers/historyController.js");

router.get("/", verifyJWT, getAllHistory);
router.post("/create", verifyJWT, createHistory);

module.exports = router;