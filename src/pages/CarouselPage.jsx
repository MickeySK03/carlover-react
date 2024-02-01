import { Link } from "react-router-dom";
export default function Carousel({ carObj, carId }) {
  const price = Number(carObj.price).toLocaleString();
  return (
    <Link to={`/allcars/${carId}`}>
      <div className="carousel-item">
        <div className="bg-white rounded-2xl hover:ring ring-sky-600">
          <div className="max-w-sm object-cover">
            <img src={carObj.image} className="rounded-box max-h-64" />
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
