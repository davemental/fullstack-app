require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions.js');
const credentials = require('./middleware/credentials.js');
const app = express();
const PORT = process.env.PORT || 5051;

//routes
const userRouter = require("./routes/userRoute.js");
const authRouter = require("./routes/authRoute.js");
const historyRouter = require("./routes/historyRoute.js");

app.use(credentials);

//middleware
app.use(cors(corsOptions)); // cross origin resource sharing
app.use(express.urlencoded({ extended: true })); // middle ware to handle urlencoded form data
app.use(express.json()); // build middleware for json
app.use(cookieParser()); //for cookies

//api endpoints
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/history", historyRouter);

app.listen(PORT, ()=> console.log(`Listing on port ${PORT}`));

