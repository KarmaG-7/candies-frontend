import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./Candy.css";

function Candy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candy, setCandy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getCandyById() {
    setIsLoading(true);
    try {
      let url =
        process.env.NODE_ENV === "production"
          ? `https://candies-backend.onrender.com/candies/${id}`
          : `http://localhost:3001/candies/${id}`;

      let result = await axios.get(url);
      console.log(result.data);
      setCandy(result.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCandyById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete() {
    try {
      let url =
        process.env.NODE_ENV === "production"
          ? `https://candies-backend.onrender.com/candies/${id}`
          : `http://localhost:3001/candies/${id}`;

      await axios.delete(url);
      alert("This candy has been deleted 🚮");
      navigate("/candies");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="candy-container">
          {candy && (
            <>
              <img
                className="candy-image"
                src={candy.candy_image}
                alt="Candy Bar"
              />
              <div className="candy-body">
                <h2>{candy.candy_name}</h2>
                <span style={{ color: "#F5F5F5" }}>${candy.price}</span>
                <p style={{ fontWeight: "bold" }}>
                  "-{candy.candy_description}"
                </p>
                <p>Enjoy this candy? {candy.is_favorite ? "😋" : "☹️"}</p>
                <p>Rating: {candy.rating}/10</p>
                <button
                  style={{ margin: "3px" }}
                  onClick={() => navigate(`/candies`)}
                >
                  Go Back.
                </button>
                <button
                  style={{ margin: "3px" }}
                  onClick={() => navigate(`/candies/edit/${id}`)}
                >
                  Edit
                </button>
                <button style={{ margin: "3px" }} onClick={handleDelete}>
                  <span style={{ color: "red" }}>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
export default Candy;
