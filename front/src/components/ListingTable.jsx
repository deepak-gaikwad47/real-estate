import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ListingTable.css";
import AddListingModal from "./AddListModal";
import { BASE_URL } from "../constant";

const ListingTable = ({ handleAddListing, setListings, listings }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = (query) => {
    const filtered = listings.filter((listing) => {
      const {
        fields: {
          address,
          title,
          transaction_type,
          reality_type,
          publication_date,
        },
      } = listing;
      return (
        address.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        transaction_type.toLowerCase().includes(query.toLowerCase()) ||
        reality_type.toLowerCase().includes(query.toLowerCase()) ||
        publication_date.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };
  const fetchData = async () => {
    const data = await fetch(`${BASE_URL}/get`, {
      method: "GET",
      mode: "cors",
    });
    const respose = await data.json();
    setListings(respose);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(listings);
    } else {
      filterData(searchQuery);
    }
  }, [searchQuery, listings]);

  return (
    <div style={{ overflowX: "auto" }}>
      {listings.length && (
        <>
          <h1 style={{ textAlign: "center" }}>Real Estate Listings</h1>
          <input
            type="text"
            style={{ marginLeft: "203px", width: "79%" }}
            placeholder="Search data in table..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Address</th>
                <th>Transaction type</th>
                <th>Realty type</th>
                <th>Publication date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length ? (
                filteredData.map((listing, index) => {
                  const {
                    fields: {
                      address,
                      title,
                      transaction_type,
                      reality_type,
                      publication_date,
                    },
                    pk: id,
                  } = listing;
                  return (
                    <tr key={index}>
                      <td key={index}>
                        <Link to={`/listing/${id}`}>{title}</Link>
                      </td>
                      <td className="table-cell">{address}</td>
                      <td className="table-cell">{transaction_type}</td>
                      <td className="table-cell">{reality_type}</td>
                      <td className="table-cell">{publication_date}</td>
                    </tr>
                  );
                })
              ) : (
                <p style={{ color: 'red'}}>No record found</p>
              )}
            </tbody>
          </table>
        </>
      )}
      <AddListingModal
        setData={setListings}
        handleAddListing={handleAddListing}
      />
    </div>
  );
};

export default ListingTable;
