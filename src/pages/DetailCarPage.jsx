import { useLocation, useParams } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

export default function DetailCarPage() {
  const { deleteCar, authUser, loading, setLoading } = useAuth();
  const { state } = useLocation();
  const [car, setCar] = useState([]);
  const { carId } = useParams();
  const navigate = useNavigate();

  console.log(state);

  useEffect(() => {
    axios
      .get(`/allcars/${carId}`)
      .then((res) => {
        setCar(res.data.detailCar);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching car detail:", err);
        setLoading(false);
      });
  }, [carId, setLoading]);

  const createdDate = new Date(car.createAt);
  const formatDate = createdDate.toLocaleDateString("en-GB");
  const price = Number(car.price).toLocaleString();
  const mileage = Number(car.mileage).toLocaleString();

  const handleClickConfirm = async () => {
    await axios.patch(`/editStatus/${carId}`);
    navigate("/adminbookcar");
  };

  const handleClickDelete = () => {
    deleteCar(car.id);
    navigate("/allcars");
  };

  const handleClickCancel = async () => {
    await axios.patch(`/admincar/${carId}`);
    navigate("/adminbookcar");
  };
  return (
    <>
      {loading ? (
        <div>{Loading}</div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-row justify-center items-center">
            <div className="w-1/2 flex justify-center">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model} Image`}
                width={500}
                className=""
              />
            </div>
            <div className="w-1/2 m-3">
              <div className="font-bold text-xl">
                {car.brand} {car.model}
              </div>
              <div className="text-lg">ปี {car.year}</div>
              <div className="text-blue-700">ราคา {price} บาท</div>
              <h1>สถานที่: {car.location}</h1>
              <h1>วันที่ลงขาย: {formatDate}</h1>
              <div>รายละเอียด:</div>
              <div className="border h-48 overflow-auto p-2">
                {car.description}
              </div>
              {authUser.role === "ADMIN" ? (
                <div>
                  {car.isReserve === false ? (
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
                  ) : (
                    <div>
                      {state?.status === "Pending" ? (
                        <button
                          className="bg-blue-500 rounded-md py-1 px-5 mx-3"
                          onClick={handleClickConfirm}
                        >
                          Confirm Booking
                        </button>
                      ) : (
                        <div className="hidden"></div>
                      )}
                      <button
                        className="bg-red-500 text-white rounded-md py-1 px-5 mx-3"
                        onClick={handleClickCancel}
                      >
                        Cancel a Booking
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {car.isReserve === false ? (
                    <div className="flex justify-center mt-3">
                      <Link to={`/checkout/${carId}`}>
                        <button className="bg-blue-400 rounded-md py-1 px-5 ">
                          Book Car
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex justify-center mt-3">
                      <Link to={`/checkout/${carId}`}>
                        <button
                          className="bg-gray-300 rounded-md py-1 px-5 cursor-not-allowed opacity-50"
                          disabled
                        >
                          Book Car
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
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
                <div>{mileage}</div>
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
          {state?.status === "Pending" ? (
            <div className=" flex flex-col justify-center items-center mt-10">
              <div className="font-semibold mb-4">หลักฐานการชำระเงิน</div>
              <img src={state.image} alt="" className="w-[300px]" />
            </div>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      )}
    </>
  );
}
