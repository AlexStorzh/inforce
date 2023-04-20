import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../components/Modal";
import {
  fetchProducts,
  SORT,
  selectSort,
  selectProductsSortedByName,
  selectProductsSortedByCount,
  setSort,
} from "../store/Slices/productSlice";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

const ProductListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const productsSortedByCount = useSelector(selectProductsSortedByCount);
  const productsSortedByName = useSelector(selectProductsSortedByName);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortButtonClicked = () => {
    dispatch(setSort(sort === SORT.BY_NAME ? SORT.BY_COUNT : SORT.BY_NAME));
  };

  const productList =
    sort === SORT.BY_NAME ? productsSortedByName : productsSortedByCount;

  return (
    <div className="list">
      <div className="header-buttons">
        <button className="add-prdouct" onClick={() => setShowModal(true)}>
          Add Product
        </button>

        <button onClick={handleSortButtonClicked}>
          {sort === SORT.BY_NAME ? "Sort by count" : "Sort by name"}
        </button>
        {productList.map((product) => {
          return (
            <div style={{ display: "flex" }}>
              <li
                style={{ margin: "20px", cursor: "pointer" }}
                key={product._id}
                onClick={() => navigate("/product/" + product._id)}
              >
                Name: {product.name} - Image: {product.imageUrl} - Count:
                {product.count} Size : Width: {product.width}, Height:{" "}
                {product.height}, Weight: {product.weight}
              </li>
              <button
                onClick={() => setShowDeleteModal(true)}
                style={{ marginLeft: "40px", height: "30px" }}
              >
                DELETE ME
              </button>
              {showDeleteModal && (
                <DeleteModal
                  id={product._id}
                  setShowDeleteModal={setShowDeleteModal}
                />
              )}
            </div>
          );
        })}
        {showModal && <Modal setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default ProductListPage;
