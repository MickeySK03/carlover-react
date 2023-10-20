import { useState, useRef, useEffect } from "react";
import Loading from "../../components/Loading";
import axios from "../../config/axios";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate, useParams } from "react-router-dom";

export default function SellCarPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileEl = useRef(null);
  const { setAllCar } = useAuth();

  const { carId } = useParams();
  const [input, setInput] = useState({
    id: carId,
    brand: "",
    model: "",
    year: "",
    color: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    location: "",
    description: "",
    price: "",
    reservePrice: "",
    driveTrain: "",
    seat: "",
    image: "",
  });
  useEffect(() => {
    axios
      .get(`/allcars/${carId}`)
      .then((res) => {
        setInput({
          ...input,
          brand: res.data.detailCar.brand,
          model: res.data.detailCar.model,
          year: res.data.detailCar.year,
          color: res.data.detailCar.color,
          mileage: res.data.detailCar.mileage,
          fuelType: res.data.detailCar.fuelType,
          transmission: res.data.detailCar.transmission,
          location: res.data.detailCar.location,
          description: res.data.detailCar.description,
          price: res.data.detailCar.price,
          reservePrice: res.data.detailCar.reservePrice,
          driveTrain: res.data.detailCar.driveTrain,
          seat: res.data.detailCar.seat,
          image: res.data.detailCar.image,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      if (input.brand) {
        formData.append("brand", input.brand);
      }
      if (input.model) {
        formData.append("model", input.model);
      }
      if (input.year) {
        formData.append("year", input.year);
      }
      if (input.color) {
        formData.append("color", input.color);
      }
      if (input.mileage) {
        formData.append("mileage", input.mileage);
      }
      if (input.fuelType) {
        formData.append("fuelType", input.fuelType);
      }
      if (input.transmission) {
        formData.append("transmission", input.transmission);
      }
      if (input.location) {
        formData.append("location", input.location);
      }
      if (input.description) {
        formData.append("description", input.description);
      }
      if (input.reservePrice) {
        formData.append("reservePrice", input.reservePrice);
      }
      if (input.driveTrain) {
        formData.append("driveTrain", input.driveTrain);
      }
      if (input.seat) {
        formData.append("seat", input.seat);
      }
      if (input.price) {
        formData.append("price", input.price);
      }
      setLoading(true);
      await axios.patch(`/allcars/${carId}`, formData);
      const res = await axios.get("/allcars");
      console.log(res.data);
      const updateCar = res.data.car;
      setAllCar(updateCar);
      navigate("/allcars");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmitForm}>
        <h1 className="text-center text-lg m-3">Edit Car Form</h1>
        <div className="flex flex-row justify-evenly">
          <div>
            <h4>Brand</h4>
            <input
              type="text"
              placeholder="brand"
              className="border bg-slate-50"
              value={input.brand}
              onChange={(e) => setInput({ ...input, brand: e.target.value })}
              name="brand"
            />
            <h4>Model</h4>
            <input
              type="text"
              placeholder="model"
              className="border bg-slate-50"
              value={input.model}
              onChange={(e) => setInput({ ...input, model: e.target.value })}
              name="model"
            />
            <h4>years</h4>
            <input
              type="text"
              placeholder="years"
              className="border bg-slate-50"
              value={input.year}
              onChange={(e) => setInput({ ...input, year: e.target.value })}
              name="year"
            />
            <h4>color</h4>
            <input
              type="text"
              placeholder="color"
              className="border bg-slate-50"
              value={input.color}
              onChange={(e) => setInput({ ...input, color: e.target.value })}
              name="color"
            />
            <h4>mileage</h4>
            <input
              type="text"
              placeholder="mileage"
              className="border bg-slate-50"
              value={input.mileage}
              onChange={(e) => setInput({ ...input, mileage: e.target.value })}
              name="mileage"
            />
            <h4>seat</h4>
            <input
              type="text"
              placeholder="seat"
              className="border bg-slate-50"
              value={input.seat}
              onChange={(e) => setInput({ ...input, seat: e.target.value })}
              name="seat"
            />
            <h4>fueltype</h4>
            <input
              type="text"
              placeholder="fuelType"
              className="border bg-slate-50"
              value={input.fuelType}
              onChange={(e) => setInput({ ...input, fuelType: e.target.value })}
              name="fuelType"
            />
            <h4>transmission</h4>
            <input
              type="text"
              placeholder="transmission"
              className="border bg-slate-50"
              value={input.transmission}
              onChange={(e) =>
                setInput({ ...input, transmission: e.target.value })
              }
              name="transmission"
            />
          </div>
          <div>
            <h4>location</h4>
            <input
              type="text"
              placeholder="location"
              className="border bg-slate-50"
              value={input.location}
              onChange={(e) => setInput({ ...input, location: e.target.value })}
              name="location"
            />
            <h4>price</h4>
            <input
              type="text"
              placeholder="price"
              className="border bg-slate-50"
              value={input.price}
              onChange={(e) => setInput({ ...input, price: e.target.value })}
              name="price"
            />
            <h4>book price</h4>
            <input
              type="text"
              placeholder="reservePrice"
              className="border bg-slate-50"
              value={input.reservePrice}
              onChange={(e) =>
                setInput({ ...input, reservePrice: e.target.value })
              }
              name="reservePrice"
            />
            <h4>drivetrain</h4>
            <input
              type="text"
              placeholder="drivetrain"
              className="border bg-slate-50"
              value={input.driveTrain}
              onChange={(e) =>
                setInput({ ...input, driveTrain: e.target.value })
              }
              name="driveTrain"
            />
            <h4>description</h4>
            <input
              type="text"
              placeholder="description"
              className="border bg-slate-50 w-60 h-48"
              value={input.description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              name="description"
            />
          </div>
        </div>
        {file ? (
          <div
            className="flex justify-center"
            onClick={() => fileEl.current.click()}
          >
            <img src={URL.createObjectURL(file)} alt="post" />
          </div>
        ) : (
          <img src={input.image} onClick={() => fileEl.current.click()} />
        )}
        <input
          type="file"
          className="hidden"
          ref={fileEl}
          onChange={(e) => {
            if (e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <div className="flex justify-center mt-5">
          <button className="border bg-blue-300 px-3 rounded-md m-3">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
