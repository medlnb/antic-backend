const express = require("express");
const {
  GetRooms,
  createRoom,
  deleteRoom,
} = require("../Controllers/RoomsController");
// const RequireAuth = require("../Middleware/RequireAuth");

const router = express.Router();

// router.use(RequireAuth);

router.get("/", GetRooms);
router.post("/", createRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
