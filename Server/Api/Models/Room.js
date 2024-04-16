import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
   
    },
    maxpeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      default: false,
    },
    roomNumbers: [{number:Number,unavailableDate:{type:[Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
