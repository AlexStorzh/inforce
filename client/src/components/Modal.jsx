import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProduct } from "../store/Slices/productSlice";
const Modal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const handleConfirm = () => {
    const newProduct = {
      imageUrl,
      name,
      count,
      size: {
        width,
        height,
      },
      weight,
    };
    dispatch(createProduct(newProduct));

    setShowModal(false);
  };

  return (
    <div className="modal">
      <form action="" onSubmit={handleSubmit(handleConfirm)}>
        <input
          {...register("imageUrl", {
            required: true,
          })}
          type="text"
          placeholder="ImageUrl"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          {...register("count", {
            required: true,
          })}
          type="number"
          placeholder="Count"
          onChange={(e) => setCount(e.target.value)}
        />
        <input
          {...register("height", {
            required: true,
          })}
          type="text"
          placeholder="height"
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          {...register("width", {
            required: true,
          })}
          type="text"
          placeholder="width"
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          {...register("weight", {
            required: true,
          })}
          type="text"
          placeholder="weight"
          onChange={(e) => setWeight(e.target.value)}
        />

        <div>
          <button className="confirm" onClick={() => handleConfirm()}>
            Confirm
          </button>
          <button className="close" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
