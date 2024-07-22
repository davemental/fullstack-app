const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const { getAllUsers, createUser } = require("../controllers/userController");

router.get("/",verifyJWT, getAllUsers);
router.post("/create", verifyJWT, createUser);

module.exports = router;