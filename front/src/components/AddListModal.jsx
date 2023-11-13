import React, { useState } from "react";
import Modal from "react-modal";
import "../style/AddListModal.css";

Modal.setAppElement("#root");

const AddListingModal = ({ setData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    address: "",
    transaction_type: "",
    reality_type: "",
    publication_date: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewListing({
      ...newListing,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setNewListing({
      ...newListing,
      [name]: value,
    });
  };

  const isFormFilled = () => {
    for (const key in newListing) {
      if (newListing[key] === "") {
        return false;
      }
    }
    return true;
  };

  const updateFormComplete = () => {
    setIsFormComplete(isFormFilled());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://0.0.0.0:8000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListing),
    });
    const addNewData = await response.json();
    const newData = {
      model: "api.estate",
      pk: addNewData.id,
      fields: addNewData,
    };
    setData((prev) => [...prev, {...newData}] );
    setNewListing({
      title: '',
      address: '',
      transactionType: '',
      realtyType: '',
      publicationDate: '',
    });
    setIsFormComplete(false);
    setModalIsOpen(false);
  };

  return (
    <div className="buttonParentDiv">
      <button className="btn btn-primary addButton" onClick={openModal}>
        Add New Listing
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Add New Listing</h2>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newListing.title}
              onChange={handleInputChange}
              onBlur={updateFormComplete}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={newListing.address}
              onChange={handleInputChange}
              onBlur={updateFormComplete}
            />
          </div>
          <div className="form-group formfiledWrapper">
            <label>Transaction type</label>
            <select
              name="transaction_type"
              value={newListing.transaction_type}
              onChange={handleSelectChange}
              onBlur={updateFormComplete}
            >
              <option value="">Select Transaction Type</option>
              <option value="Rental">Rental</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
          <div className="form-group formfiledWrapper">
            <label>Transaction type</label>
            <select
              name="reality_type"
              value={newListing.reality_type}
              onChange={handleSelectChange}
              onBlur={updateFormComplete}
            >
              <option value="">Select Reality Type</option>
              <option value="office">Office</option>
              <option value="land">Land</option>
              <option value="warehouse">Warehouse</option>
              <option value="retail">Retail</option>
              <option value="coworking">Co-working</option>
            </select>
          </div>
          <div className="form-group formfiledWrapper">
            <label>Publication date</label>
            <input
              type="date"
              name="publication_date"
              value={newListing.publication_date}
              onChange={handleInputChange}
              onBlur={updateFormComplete}
            />
          </div>
          <button
            className="btn btn-primary submit"
            onClick={handleSubmit}
            disabled={!isFormComplete}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddListingModal;
