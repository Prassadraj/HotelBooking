import Hotel from "../Models/Hotel.js";
import Room from "../Models/Room.js";

//createHotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).send("Addded SuccessFully");
  } catch (error) {
    next(error);
  }
};
//updateHotel
export const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body);
    res.json(updatedHotel).status(200);
  } catch (error) {
    next(error);
  }
};
//delete
export const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id, req.body);
    res.send("Hotel Deleted").status(200);
  } catch (error) {
    next(error);
  }
};
//getHotel
export const getHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getHotels = await Hotel.findById(id, req.body);
    res.json(getHotels).status(200);
  } catch (error) {
    next(error);
  }
};
//getAll Hotels
export const getallHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const getAll = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999999 },
    }).limit(req.query.limit);
    res.json(getAll).status(200);
  } catch (error) {
    next(error);
  }
};
export const getHotelsByLimit = async (req, res, next) => {
  try {
    const getAll = await Hotel.find().limit(req.query.limit);
    res.json(getAll).status(200);
  } catch (error) {
    next(error);
  }
};
//CountCity
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const List = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.json(List).status(200);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const ResortsCount = await Hotel.countDocuments({ type: "resort" });
    const VillasCount = await Hotel.countDocuments({ type: "villa" });
    const CabinsCount = await Hotel.countDocuments({ type: "cabin" });

    res
      .json([
        { type: "hotel", count: hotelCount },
        { type: "apartment", count: apartmentCount },
        { type: "resort", count: ResortsCount },
        { type: "villa", count: VillasCount },
        { type: "cabin", count: CabinsCount },
      ])
      .status(200);
  } catch (error) {
    next(error);
  }
};
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (error) {
    next(error);
  }
};
