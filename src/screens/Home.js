import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import API_BASE_URL from "../config/api";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadFoodItems = async () => {
    try {
      let response = await fetch(`${API_BASE_URL}/api/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error loading food items:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div className="min-vh-100 bg-dark text-white">
      <Navbar />

      {/* Carousel Section */}
      <div>
        <Carousel search={search} setSearch={setSearch} />
      </div>

      {/* Food Items Section */}
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row">
                  {foodItems.length > 0 ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodItem={filterItems}
                              foodName={filterItems.name}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No items found</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
