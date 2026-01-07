import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import API_BASE_URL from "../config/api";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3" style={{ color: "#fff" }}>
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
      let response = await fetch(`${API_BASE_URL}/api/orderData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
      if (response.status === 200) {
        dispatch({ type: "DROP" });
        navigate("/myorders");
      } else {
        console.error("Checkout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  let totalPrice = data.reduce(
    (total, food) => total + Number(food.price),
    0
  );

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md" style={{ backgroundColor: "#23272b", color: "white", borderRadius: "10px", padding: "20px" }}>
        <table className="table table-hover table-borderless table-dark">
          <thead>
            <tr style={{ color: "#28a745", fontWeight: "bold", fontSize: "1.2rem" }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row" style={{ color: "#fff" }}>
                  {index + 1}
                </th>
                <td style={{ color: "#fff" }}>{food.name}</td>
                <td style={{ color: "#fff" }}>{food.qty}</td>
                <td style={{ color: "#fff" }}>{food.size}</td>
                <td style={{ color: "#fff" }}>
                  {food.price}
                </td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon
                      style={{ color: "#fff" }}
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2" style={{ fontWeight: "bold", color: "#fff" }}>
            Total Price: {totalPrice}/-
          </h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
