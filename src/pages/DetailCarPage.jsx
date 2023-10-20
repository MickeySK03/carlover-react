import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetailCarPage() {
  const [car, setCar] = useState([]);
  const { carId } = useParams();
  const { deleteCar } = useAuth();
  const navigate = useNavigate();
  // console.log(carId);
  useEffect(() => {
    axios
      .get(`/allcars/${carId}`)
      .then((res) => {
        setCar(res.data.detailCar);
      })
      .catch((err) => console.log(err));
  }, [carId]);
  const handleClickDelete = () => {
    deleteCar(car.id);
    navigate("/allcars");
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-start">
        <div className="h-auto w-1/2">
          <img src={car.image} alt="alfa" className="" />
        </div>
        <div className="w-1/2 h-auto m-3">
          <h1>
            {car.brand} {car.model}
          </h1>
          <h1>ปี {car.year}</h1>
          <h1>{car.price} บาท</h1>
          <h1>{car.location}</h1>
          <h1>{car.createAt}</h1>
          <div className="border h-48">
            <h1>{car.description}</h1>
          </div>
          <div className="flex justify-center mt-3">
            <button className="bg-blue-400 rounded-md py-1 px-5 ">
              Book Car
            </button>
          </div>
          <div className="flex justify-center mt-3">
            <Link to={`/editcar/${carId}`}>
              <button className="bg-lime-300 rounded-md py-1 px-8 mx-3">
                Edit
              </button>
            </Link>
            <button
              className="bg-red-500 rounded-md py-1 px-5 mx-3"
              onClick={handleClickDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around w-auto border px-3">
        <hr />
        <div className="flex flex-col w-1/2 ">
          <div className="flex flex-row justify-between mx-10">
            <div>color</div>
            <div>{car.color}</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between mx-10">
            <div>mileage</div>
            <div>{car.mileage}</div>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row justify-between mx-10">
            <div>fuelType</div>
            <div>{car.fuelType}</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between mx-10">
            <div>transmission</div>
            <div>{car.transmission}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
