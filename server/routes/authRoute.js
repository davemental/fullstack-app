const express = require('express');
const router = express.Router();

const { handleRefreshToken, handleLogout, handleLogin } = require("../controllers/authController");

router.get("/refresh", handleRefreshToken);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);

module.exports = router;