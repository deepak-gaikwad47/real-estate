import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style//ListingDetail.css";
import { BASE_URL } from "../constant";

const ListingDetail = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetails = async () => {
    const data = await fetch(`${BASE_URL}/estate/${id}`, {
      method: "GET",
      mode: "cors",
    });
    const result = await data.json();
    setDetails(result);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div className="container">
        <h2>{details.title}</h2>
        <p>Address: {details.address}</p>
        <p>Transaction type: {details.transaction_type}</p>
        <p>Realty type: {details.reality_type}</p>
        <p>Publication date: {details.publication_date}</p>
      </div>
      <button
        className="btn btn-primary backButton"
        onClick={() => navigate("/")}
      >
        Back to listing
      </button>
    </>
  );
};

export default ListingDetail;
