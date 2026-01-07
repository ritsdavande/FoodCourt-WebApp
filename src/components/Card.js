import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "../components/ContextReducer";

export default function Card(props) {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  const options = props.options || {};
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItem || props.item || {}; // Pass full food object as 'item'

  // Setup default size when component mounts
  useEffect(() => {
    if (size === "" && priceOptions.length > 0) {
      setSize(priceOptions[0]);
    }
  }, [priceOptions, size]);

  const handleQty = (e) => setQty(Number(e.target.value));
  const handleOptions = (e) => setSize(e.target.value);

  // Find existing cart item with same ID and size
  const existingCartItem = data.find(
    (item) =>
      item.id === (foodItem._id || props.foodItemId) && item.size === size
  );

  // Calculate price for selected size * qty
  const finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }

    // If already in cart with same size, update quantity and price
    if (existingCartItem) {
      dispatch({
        type: "UPDATE",
        id: foodItem._id || props.foodItemId,
        qty: qty,
        size: size, // Include size to match correctly in reducer
        price: finalPrice, // We still pass this, but reducer should handle unit price calc if needed, or we trust this
      });
    } else {
      // Add as a new cart item
      dispatch({
        type: "ADD",
        item: {
          id: foodItem._id || props.foodItemId,
          name: foodItem.name || props.foodName,
          qty: qty,
          size: size,
          price: finalPrice, // Use calculated final price
          img: props.ImgSrc,
        },
      });
    }
  };

  return (
    <div
      className="card mt-3"
      style={{
        width: "18rem",
        minHeight: "380px",
        background: "#23272b",
        color: "white",
      }}
    >
      <img
        src={props.ImgSrc}
        className="card-img-top"
        alt={props.foodName}
        style={{
          height: "150px",
          objectFit: "fill",
          borderTopLeftRadius: "0.375rem",
          borderTopRightRadius: "0.375rem",
        }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold" style={{ color: "#fff" }}>
          {props.foodName}
        </h5>
        <div
          className="container w-100 p-0 d-flex align-items-center my-2"
          style={{ height: "38px" }}
        >
          <select
            className="form-select form-select-sm w-auto bg-success text-white mx-1"
            value={qty}
            onChange={handleQty}
            ref={priceRef}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="form-select form-select-sm w-auto bg-success text-white mx-2"
            value={size}
            onChange={handleOptions}
          >
            {priceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="d-inline ms-2 h-100 w-20 fs-5">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success mt-2 w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
