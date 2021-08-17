const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const Role = require("./routers/role");
const User = require("./routers/user");
const Board = require("./routers/board");
const Auth = require("./routers/auth");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/role", Role);
app.use("/api/user", User);
app.use("/api/board", Board);
app.use("/api/auth", Auth);

app.listen(process.env.PORT, () => {
    console.log("Backend running in port ", process.env.PORT);
});

dbConnection();