import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./featured.css";
import { SearchContext } from "../../context/searchContext";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const { data, loading, error } = useFetch(
    `https://stayfinder-blaa.onrender.com/api/hotel/countByCity?cities=madrid,berlin,london`
  );

  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  // console.log(data);
  const handleClick = (city) => {
    setDestination(city);
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: city, date, options },
    });
    navigate("/hotels", {
      state: { destination: city, date, options },
    });
  };
  console.log(destination);
  return (
    <div className="featured">
      <div onClick={() => handleClick("madrid")} className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>madrid</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>

      <div onClick={() => handleClick("berlin")} className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>berlin</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div onClick={() => handleClick("london")} className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>london</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
