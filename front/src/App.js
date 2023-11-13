import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ListingDetail, ListingTable } from "./components";

const App = () => {
  const [listings, setListings] = useState([]);

  const handleAddListing = (newListing) => {
    setListings([...listings, newListing]);
  };
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListingTable
              listings={listings}
              setListings={setListings}
              handleAddListing={handleAddListing}
            />
          }
        />
        <Route
          path="/listing/:id"
          element={<ListingDetail listings={listings} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
