import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./featuredProperties.css";
import { Navigate, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";

const FeaturedProperties = () => {
  const { dispatch } = useContext(SearchContext);
  const [url, setUrl] = useState(
    "https://stayfinder-blaa.onrender.com/api/hotel?featured=true"
  );
  const { data, loading, error } = useFetch(url);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
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

  const handleClick = (ID) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options, _id: ID } });
  };

  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item, i) => (
            <div
              className="fpItem"
              key={item._id}
              onClick={() => handleClick(item._id)} // Corrected onClick handler
            >
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
