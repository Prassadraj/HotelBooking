import { Link } from "react-router-dom";
import "./searchItem.css";
import { format } from "date-fns";
import { useContext, useState } from "react"; // Import useState
import { SearchContext } from "../../context/searchContext";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ date, item, options }) => {
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState(new Date());

  // State to manage alert message and visibility
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    if (
      `${format(date[0].endDate, "MM/dd/yyyy")}` ==
      `${format(todayDate, "MM/dd/yyyy")}`
    ) {
      setAlertMessage("Select Your Date");
      setShowAlert(true);
    } else {
      dispatch({ type: "NEW_SEARCH", payload: { date, options } });
      navigate(`/hotel/${item._id}`);
    }
  };

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>

          <button onClick={handleSearch} className="siCheckButton">
            See availability
          </button>
        </div>
      </div>
      {showAlert && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowAlert(false)}>
              ×
            </span>
            {alertMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchItem;
