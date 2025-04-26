const mongoose = require("mongoose");
const Room = require("../Models/RoomModel");
const { removeImage } = require("./ImageController");

const GetRooms = async (req, res) => {
  try {
    const data = await Room.find({}).sort({ createdAt: -1 });
    if (!data) return res.status(401).json({ err: "error fetching the rooms" });

    const rooms = data.map((room) => {
      const weekInSec = 1000 * 60 * 60 * 24 * 7;
      const isNew =
        room.createdAt.getTime() > Date.now() - weekInSec ?? undefined;
      return { ...room._doc, isNew };
    });
    return res.status(201).json({ rooms });
  } catch (err) {
    return res.status(501).json(err);
  }
};

const createRoom = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;
    const room = await Room.create({ imageUrl, title });
    if (!room) return res.status(401).json({ err: "error creating the room" });
    return res.status(201).json(room);
  } catch (err) {
    return res.status(501).json(err);
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(roomId))
      return res.status(401).json({ err: "invalid room id" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(401).json({ err: "room not found" });
    const imageId = room.imageUrl.split("/").pop().split(".")[0];

    const result = await removeImage(imageId);

    if (result.result !== "ok")
      return res.status(401).json({ err: "error removing the image" });

    await room.deleteOne();

    return res.status(201).json("room");
  } catch (err) {
    console.log(err);
    return res.status(501).json(err);
  }
};

module.exports = { GetRooms, createRoom, deleteRoom };
