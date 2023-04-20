import React from "react";
import { deleteProduct } from "../store/Slices/productSlice";
import { useDispatch } from "react-redux";
const DeleteModal = ({ setShowDeleteModal, id }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    setShowDeleteModal(false);
    dispatch(deleteProduct(id));
  };
  return (
    <div
      style={{
        height: "100px",
        width: "100px",
        backgroundColor: "grey",
        display: " flex",
        flexDirection: "column",
      }}
    >
      This is your item ID : {id}
      <button onClick={() => handleClick()} style={{ color: "red" }}>
        CONFIRM DELETE
      </button>
      <button onClick={() => setShowDeleteModal(false)}>CANCEL DELETE</button>
    </div>
  );
};

export default DeleteModal;
