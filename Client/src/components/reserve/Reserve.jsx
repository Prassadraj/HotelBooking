import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Reserve.css";
import {toast} from 'react-toastify'
import {
  faCircleArrowDown,
  faCircleXmark,
  faL,
} from "@fortawesome/free-solid-svg-icons";

import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, error, loading } = useFetch(`https://hotelbooking-api-bdtf.onrender.com/api/hotel/room/${hotelId}`);
  const { date } = useContext(SearchContext);

  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const GetAllDates = getDateInRange(date[0].startDate, date[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDate.some((date) =>
      GetAllDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handlerSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const url = `https://hotelbooking-api-bdtf.onrender.com/api/room/available/${roomId}`;
          const response = await axios.put(url, { date: GetAllDates });
          return response.data;
        })
      );
        toast.success("Reserved Successfully")
      setOpen(false);
      navigate('/');
    } catch (error) {
      toast.error("Check the Date")
      console.error("Error occurred while processing reservation:", error);
    }
  };
  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Rooms:</span>
        {data.map((item) => (
          <div key={item._id} className="rItem">
            <div className="ritemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max People:{item.maxpeople}</div>
              {/* <div className="rPrice">Price:{item.price}</div> */}
            </div>
            <div className="selectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className="room">
                  <label htmlFor="">{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handlerSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
