import { useState, useRef } from "react";
import Loading from "../../components/Loading";
import axios from "../../config/axios";
import { useAuth } from "../../hooks/use-auth";
import { ImageIcon } from "../../icons";
import { useNavigate } from "react-router-dom";

export default function SellCarPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileEl = useRef(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuelType, setFueltype] = useState("");
  const [transmission, setTransmission] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [seat, setSeat] = useState("");
  const { allCar, setAllCar } = useAuth();

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      if (brand) {
        formData.append("brand", brand);
      }
      if (model) {
        formData.append("model", model);
      }
      if (year) {
        formData.append("year", year);
      }
      if (color) {
        formData.append("color", color);
      }
      if (mileage) {
        formData.append("mileage", mileage);
      }
      if (fuelType) {
        formData.append("fuelType", fuelType);
      }
      if (transmission) {
        formData.append("transmission", transmission);
      }
      if (location) {
        formData.append("location", location);
      }
      if (description) {
        formData.append("description", description);
      }
      if (reservePrice) {
        formData.append("reservePrice", reservePrice);
      }
      if (driveTrain) {
        formData.append("driveTrain", driveTrain);
      }
      if (seat) {
        formData.append("seat", seat);
      }
      if (price) {
        formData.append("price", price);
      }
      setLoading(true);
      const res = await axios.post("/sellcar", formData);
      const newPost = res.data.post;
      setAllCar([newPost, ...allCar]);
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
        <h1 className="text-center text-lg m-3">ลงขายรถ</h1>
        <div className="flex flex-row justify-evenly">
          <div>
            <h4>Brand</h4>
            <input
              type="text"
              placeholder="brand"
              className="border bg-slate-50"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <h4>Model</h4>
            <input
              type="text"
              placeholder="model"
              className="border bg-slate-50"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <h4>years</h4>
            <input
              type="text"
              placeholder="years"
              className="border bg-slate-50"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <h4>color</h4>
            <input
              type="text"
              placeholder="color"
              className="border bg-slate-50"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <h4>mileage</h4>
            <input
              type="text"
              placeholder="mileage"
              className="border bg-slate-50"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
            <h4>seat</h4>
            <input
              type="text"
              placeholder="seat"
              className="border bg-slate-50"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
            />
            <h4>fueltype</h4>
            <input
              type="text"
              placeholder="fuelType"
              className="border bg-slate-50"
              value={fuelType}
              onChange={(e) => setFueltype(e.target.value)}
            />
            <h4>transmission</h4>
            <input
              type="text"
              placeholder="transmission"
              className="border bg-slate-50"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            />
          </div>
          <div>
            <h4>location</h4>
            <input
              type="text"
              placeholder="location"
              className="border bg-slate-50"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <h4>price</h4>
            <input
              type="text"
              placeholder="price"
              className="border bg-slate-50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <h4>book price</h4>
            <input
              type="text"
              placeholder="reservePrice"
              className="border bg-slate-50"
              value={reservePrice}
              onChange={(e) => setReservePrice(e.target.value)}
            />
            <h4>drivetrain</h4>
            <input
              type="text"
              placeholder="drivetrain"
              className="border bg-slate-50"
              value={driveTrain}
              onChange={(e) => setDriveTrain(e.target.value)}
            />
            <h4>description</h4>
            <input
              type="text"
              placeholder="description"
              className="border bg-slate-50 w-60 h-48"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <SelectImageButton onClick={() => fileEl.current.click()} />
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
            ลงขาย
          </button>
        </div>
      </form>
    </>
  );
}

function SelectImageButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 rounded-lg py-12 flex flex-col items-center cursor-pointer mx-80"
    >
      <div className="bg-gray-400 h-10 w-10 rounded-full flex items-center justify-center">
        <ImageIcon />
      </div>
      <span>Add photo</span>
    </div>
  );
}
