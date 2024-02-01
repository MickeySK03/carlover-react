import { useState, useRef } from "react";
import Loading from "../components/Loading";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import InputErrorMessage from "../features/auth/InputErrorMessage";
import { createProductSchema } from "../utils/product-validator";
import validateSchema from "../utils/validate-schema";
import { ImageIcon } from "../icons";

export default function SellCarPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [err, setErr] = useState("");
  const [file, setFile] = useState(null);
  const fileEl = useRef(null);
  const { loading, setLoading,setAllCar,allCar } = useAuth();
  const [carDetails, setCarDetails] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const result = validateSchema(createProductSchema, carDetails);
      if (result) {
        return setError(result);
      }
      const formData = createFormData();
      const res = await axios.post("/sellcar", formData);
      const newPost = res.data.post;
      setAllCar([newPost, ...allCar]);
      navigate("/allcars");
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("image", file);
    for (const key in carDetails) {
      if (carDetails[key]) {
        formData.append(key, carDetails[key]);
      }
    }
    return formData;
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
              name="brand"
              type="text"
              placeholder="brand"
              className="border bg-slate-50"
              value={carDetails.brand}
              onChange={handleChange}
            />
            {error.brand && <InputErrorMessage message={error.brand} />}
            <h4>Model</h4>
            <input
              name="model"
              type="text"
              placeholder="model"
              className="border bg-slate-50"
              value={carDetails.model}
              onChange={handleChange}
            />
            {error.model && <InputErrorMessage message={error.model} />}
            <h4>years</h4>
            <input
              name="year"
              type="text"
              placeholder="years"
              className="border bg-slate-50"
              value={carDetails.year}
              onChange={handleChange}
            />
            {error.year && <InputErrorMessage message={error.year} />}
            <h4>color</h4>
            <input
              name="color"
              type="text"
              placeholder="color"
              className="border bg-slate-50"
              value={carDetails.color}
              onChange={handleChange}
            />
            {error.color && <InputErrorMessage message={error.color} />}
            <h4>mileage</h4>
            <input
              name="mileage"
              type="text"
              placeholder="mileage"
              className="border bg-slate-50"
              value={carDetails.mileage}
              onChange={handleChange}
            />
            {error.mileage && <InputErrorMessage message={error.mileage} />}
            <h4>seat</h4>
            <input
              name="seat"
              type="text"
              placeholder="seat"
              className="border bg-slate-50"
              value={carDetails.seat}
              onChange={handleChange}
            />
            {error.seat && <InputErrorMessage message={error.seat} />}
            <h4>fueltype</h4>
            <input
              name="fuelType"
              type="text"
              placeholder="fuelType"
              className="border bg-slate-50"
              value={carDetails.fuelType}
              onChange={handleChange}
            />
            {error.fuelType && <InputErrorMessage message={error.fuelType} />}
            <h4>transmission</h4>
            <input
              name="transmission"
              type="text"
              placeholder="transmission"
              className="border bg-slate-50"
              value={carDetails.transmission}
              onChange={handleChange}
            />
            {error.transmission && (
              <InputErrorMessage message={error.transmission} />
            )}
          </div>
          <div>
            <h4>location</h4>
            <input
              name="location"
              type="text"
              placeholder="location"
              className="border bg-slate-50"
              value={carDetails.location}
              onChange={handleChange}
            />
            {error.location && <InputErrorMessage message={error.location} />}
            <h4>price</h4>
            <input
              name="price"
              type="text"
              placeholder="price"
              className="border bg-slate-50"
              value={carDetails.price}
              onChange={handleChange}
            />
            {error.price && <InputErrorMessage message={error.price} />}
            <h4>book price</h4>
            <input
              name="reservePrice"
              type="text"
              placeholder="reservePrice"
              className="border bg-slate-50"
              value={carDetails.reservePrice}
              onChange={handleChange}
            />
            {error.reservePrice && (
              <InputErrorMessage message={error.reservePrice} />
            )}
            <h4>drivetrain</h4>
            <input
              name="driveTrain"
              type="text"
              placeholder="drivetrain"
              className="border bg-slate-50"
              value={carDetails.driveTrain}
              onChange={handleChange}
            />
            {error.driveTrain && (
              <InputErrorMessage message={error.driveTrain} />
            )}
            <h4>description</h4>
            <input
              name="description"
              type="text"
              placeholder="description"
              className="border bg-slate-50 w-60 h-48"
              value={carDetails.description}
              onChange={handleChange}
            />
            {error.description && (
              <InputErrorMessage message={error.description} />
            )}
          </div>
        </div>
        {file ? (
          <div
            className="flex justify-center w-full"
            onClick={() => fileEl.current.click()}
          >
            <img width={500} src={URL.createObjectURL(file)} alt="post" />
          </div>
        ) : (
          <>
            <SelectImageButton onClick={() => fileEl.current.click()} />
            <div className="flex justify-center">
              {err && <InputErrorMessage message={err} />}
            </div>
          </>
        )}
        <input
          type="file"
          className="hidden"
          ref={fileEl}
          onChange={handleImageChange}
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
