import { Link } from "react-router-dom";
export default function CarListDemo({ carObj, carId }) {
  return (
    <Link to={`/allcars/${carId}`}>
      <div className="carousel-item">
        <div className="bg-white rounded-2xl">
          <div className="w-96">
            <img src={carObj.image} className="rounded-box" />
          </div>
          <div className="m-3">
            <h1>
              {carObj.brand} {carObj.model}
            </h1>
            <h1>{carObj.year}</h1>
            <h1>{carObj.price}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
