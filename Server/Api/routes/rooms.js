import express from 'express'
import { createRoom, deleteRoom, getRoom, getallRoom, updateRoom, updateRoomAvailability } from '../controller/room.js'
import { verifyAdmin } from '../utills/verify.js';

const router =express.Router()

router.post('/:hotelid',verifyAdmin,createRoom )
router.put('/availabity/:hotelid',createRoom )

//Update
router.put("/:id",verifyAdmin,updateRoom)
router.put('/available/:id',updateRoomAvailability )

//Delete
router.delete('/:id/:hotelid',verifyAdmin,deleteRoom)

//Get
router.get('/:id',getRoom)

//GetAll
router.get('/',getallRoom)
export default router