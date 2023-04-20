
import './App.css';
import ProductListPage from './pages/ProductListPage';
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProducts } from './store/Slices/productSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="App">
      <ProductListPage />
    </div>
  );
}

export default App;
