import React, { useState } from 'react';
import './newRoom.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { roomInput } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import AlertMessage from "../Alert/AlertMessage"; 

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelid, setHotelid] = useState(undefined);
  const [room, setRoom] = useState("");
  const { data, loading, error } = useFetch("/hotel");
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!info.title) {
      setAlertMessage('Please provide Title');
      return;
    } 
    else if (!room) {
      setAlertMessage('Please provide room numbers');
      return;
    }

    let roomNumbers = room.split(",").map((room) => ({ number: room.trim() }));

    try {
      await axios.post(`/room/${hotelid}`, { ...info, roomNumbers });
      setAlertMessage('Room Created');
    } catch (error) {
      console.log(error);
      setAlertMessage('Failed to create room');
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1></h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInput.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Rooms Number</label>
                <textarea
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Give comma between room number"
                ></textarea>
              </div>
              <div className="formInput">
                <label id='chooseHotel'>Choose a Hotel</label>
                <select
                  onChange={(e) => setHotelid(e.target.value)}
                  id="hotelid"
                >
                  {loading
                    ? "Loading"
                    : data &&
                      data.map((hotels) => (
                        <option key={hotels._id} value={hotels._id}>
                          {hotels.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
            {alertMessage && <AlertMessage message={alertMessage} onClose={() => setAlertMessage('')} />} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
