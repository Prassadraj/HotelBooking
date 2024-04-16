// import Hotel from "../Models/Hotel.js";
import User from "../Models/User.js";


//updateHotel
export const updateUser=async(req,res,next)=>{
    try {
        const {id}=req.params
        const update=await User.findByIdAndUpdate(id,req.body)
        res.json(update).status(200)

    } catch (error) {
        next(error)
    }
}
//delete
export const deleteUser=async(req,res,next)=>{
    try {
        const {id}=req.params
        const deletedUser=await User.findByIdAndDelete(id,req.body)
        res.send("Hotel Deleted").status(200)
    } catch (error) {
        next(error)
    }
}
//getHotel
export const getUser=async(req,res,next)=>{
    try {
        const {id}=req.params
        const get=await User.findById(id,req.body)
        res.json(get).status(200)
    } catch (error) {
        next(error)
    }
}
//getAll Hotels
export const getallUsers =async(req,res,next)=>{
    try {
        const getAll=await User.find()
        res.json(getAll).status(200)
    } catch (error) {
        next(error)
    }
}

