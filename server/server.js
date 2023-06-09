const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const PORT = process.env.PORT || 3500;



const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser())
app.use("/auth", require("./routes/auth.routes"))
app.use("/users", require("./routes/user.routes"));
app.use("/properties", require("./routes/property.routes"));

app.get("/", (req, res) => {
    res.send({ message: "hello world" });
});

connectDB();

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});

mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        "mongoErrLog.log"
    );
});