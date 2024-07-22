const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByEmail, updateRefreshToken, findUserByToken } = require('../Model/User.js')

const handleRefreshToken = async (req, res) => { 
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await findUserByToken(refreshToken);

    if (!foundUser) return res.sendStatus(403); //Forbidden

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {

            if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
            // const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {id: decoded.id},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            res.json({ accessToken, user: foundUser.name });
        }
    );
}

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    // find user by refreshToken
    const foundUser = await findUserByToken(refreshToken);
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204); //success but no content
    }

    // delete refreshToken from db
    await updateRefreshToken(foundUser.id, "");
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    }); // secure - true - only serves on https on production
    return res.sendStatus(204); //success but no content
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all fields!" });
    }

    const foundUser = await findUserByEmail(email);

    if (!foundUser) {
        return res.status(401).json({ error: "Invalid user!" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid user!" });
    }

    //generate access token
    const accessToken = jwt.sign(
        { id: foundUser.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
    );

    //generate refresh token
    const refreshToken = jwt.sign(
        { id: foundUser.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1hr" }
    );

    // save refresh token with current user
    const result = await updateRefreshToken(foundUser.id, refreshToken);
    if (!result) {
        return res.sendStatus(401);
    }

    res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken, user: foundUser.name });
};


module.exports = {
    handleRefreshToken,
    handleLogout,
    handleLogin
} 