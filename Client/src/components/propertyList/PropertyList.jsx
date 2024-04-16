import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./propertyList.css";
import { Navigate, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";

const PropertyList = () => {
  const { data, loading, error } = useFetch("https://hotelbooking-api-bdtf.onrender.com/api/hotel/countByType");
  const [type,settype]=useState("")
  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState("");
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }])
  
  const navigate=useNavigate()
  const image = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];
  const handleClick = (t) => {
    settype(t)
    
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date,options, type:t } });
  };

  return (
    <div className="pList">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data &&
            data.map((property, i) => (
              <div
                onClick={() => {
                  handleClick(property.type);
                }}
                className="pListItem"
                key={i}
              >
                <img src={image[i]} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{property.type}</h1>
                  <h2>
                    {property.count} {property.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
