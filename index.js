const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const RoomRouter = require("./Routers/Room");
const ImageRouter = require("./Routers/image");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/room", RoomRouter);
app.use("/api/image", ImageRouter);

mongoose.connect(process.env.MONGO_URI).then(
  app.listen(process.env.PORT, () => {
    console.log(`connected to db & listening to ${process.env.PORT}`);
  })
);
