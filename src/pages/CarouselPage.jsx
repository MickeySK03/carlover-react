import { Link } from "react-router-dom";
export default function Carousel({ carObj, carId }) {
  const price = Number(carObj.price).toLocaleString();
  return (
    <Link to={`/allcars/${carId}`}>
      <div className="carousel-item">
        <div className="bg-white rounded-2xl">
          <div className="max-w-sm">
            <img src={carObj.image} className="rounded-box" />
          </div>
          <div className="m-3">
            <h1>
              {carObj.brand} {carObj.model}
            </h1>
            <h1>{carObj.year}</h1>
            <h1>{price}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
