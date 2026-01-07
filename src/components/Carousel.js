import React, { useMemo } from "react";

export default function Carousel({ search, setSearch }) {
  // Move allImages outside component or use useMemo to prevent recreation
  const allImages = useMemo(() => [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=700&fit=crop", // Burger
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&h=700&fit=crop", // Pizza
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=900&h=700&fit=crop", // Pasta
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&h=700&fit=crop", // Salad
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&h=700&fit=crop", // Sushi
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&h=700&fit=crop", // Steak
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&h=700&fit=crop", // Dessert
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&h=700&fit=crop", // Biryani
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900&h=700&fit=crop", // Sandwich
    "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?w=900&h=700&fit=crop", // Fries
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=900&h=700&fit=crop", // Fried Chicken
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=900&h=700&fit=crop", // Burger 2
  ], []);

  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    setImages(shuffled.slice(0, 3));
  }, [allImages]);

  if (images.length === 0) return null;

  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="btn text-white bg-danger"
                onClick={() => {
                  setSearch("");
                }}
              >
                X
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={images[0]}
              className="d-block w-100"
              style={{
                filter: "brightness(60%)",
                height: "500px",
                objectFit: "cover",
              }}
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={images[1]}
              className="d-block w-100"
              style={{
                filter: "brightness(60%)",
                height: "500px",
                objectFit: "cover",
              }}
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={images[2]}
              className="d-block w-100"
              style={{
                filter: "brightness(60%)",
                height: "500px",
                objectFit: "cover",
              }}
              alt="Third slide"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
