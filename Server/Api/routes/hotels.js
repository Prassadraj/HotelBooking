import express from 'express';
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotelsByLimit, getallHotels, updateHotel } from '../controller/hotel.js';
import { verifyAdmin } from '../utills/verify.js';

const router = express.Router();

// Create
router.post('/',createHotel )

//Update
router.put("/:id",verifyAdmin,updateHotel)

//Delete
router.delete('/:id',verifyAdmin,deleteHotel)

//Get
router.get('/find/:id',getHotel)

router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
router.get('/room/:id',getHotelRooms)

//GetAll
router.get('/',getallHotels)
router.get('/limit',getHotelsByLimit)



export default router;
