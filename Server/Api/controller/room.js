import Room from "../Models/Room.js";
import Hotel from "../Models/Hotel.js";

//createRoom
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  //console.log(id);
  const newRoom = new Room(req.body);
  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ saveRoom });
  } catch (error) {
    next(error);
  }
};
//UpdateRoom
export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body);
    res.json(updatedRoom).status(200);
  } catch (error) {
    next(error);
  }
};
//updateROom Availability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Room.updateOne(
      { "roomNumbers._id": id },
      {
        $push: {
          "roomNumbers.$.unavailableDate": req.body.date,
        },
      }
    );
    res.status(200).json("Room Updated"); // Reordered status and json
  } catch (error) {
    next(error);
  }
};

//delete
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  //   console.log("hotelID" + hotelId);
  try {
    const { id } = req.params;
    // console.log("id " + id);
    const deleteRoom = await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.send("Room Deleted").status(200);
  } catch (error) {
    next(error);
  }
};
//getHotel
export const getRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getRoom = await Room.findById(id, req.body);
    res.json(getRoom).status(200);
  } catch (error) {
    next(error);
  }
};
//getAll Hotels
export const getallRoom = async (req, res, next) => {
  try {
    const getallRoom = await Room.find();
    res.json(getallRoom).status(200);
  } catch (error) {
    next(error);
  }
};
