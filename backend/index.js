const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const Role = require("./routers/role");
const User = require("./routers/user");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/role", Role);
app.use("/api/user", User);

app.listen(process.env.PORT, () => {
    console.log("Backend running in port ", process.env.PORT);
});

dbConnection();