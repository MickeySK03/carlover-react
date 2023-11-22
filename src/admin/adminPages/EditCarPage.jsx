import { useState, useRef, useEffect } from "react";
import Loading from "../../components/Loading";
import axios from "../../config/axios";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate, useParams } from "react-router-dom";
import validateSchema from "../../utils/validate-schema";
import { createProductSchema } from "../../utils/product-validator";
import InputErrorMessage from "../../features/auth/InputErrorMessage";

export default function SellCarPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileEl = useRef(null);
  const { setAllCar } = useAuth();
  const { carId } = useParams();
  const [input, setInput] = useState({
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
        setInput(res.data.detailCar);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    brand,
    model,
    year,
    color,
    mileage,
    fuelType,
    transmission,
    location,
    description,
    price,
    reservePrice,
    driveTrain,
    seat,
    image,
  } = input;

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      // const formData = new FormData();
      // if (file) {
      //   formData.append("image", file);
      // }
      // if (brand) {
      //   formData.append("brand", brand);
      // }
      // if (model) {
      //   formData.append("model", model);
      // }
      // if (year) {
      //   formData.append("year", year);
      // }
      // if (color) {
      //   formData.append("color", color);
      // }
      // if (mileage) {
      //   formData.append("mileage", mileage);
      // }
      // if (fuelType) {
      //   formData.append("fuelType", fuelType);
      // }
      // if (transmission) {
      //   formData.append("transmission", transmission);
      // }
      // if (location) {
      //   formData.append("location", location);
      // }
      // if (description) {
      //   formData.append("description", description);
      // }
      // if (reservePrice) {
      //   formData.append("reservePrice", reservePrice);
      // }
      // if (driveTrain) {
      //   formData.append("driveTrain", driveTrain);
      // }
      // if (seat) {
      //   formData.append("seat", seat);
      // }
      // if (price) {
      //   formData.append("price", price);
      // }
      delete input.createAt;
      delete input.id;
      delete input.isReserve;
      const result = validateSchema(createProductSchema, input);
      if (result) {
        return setError(result);
      }
      setLoading(true);
      const formData = createFormData();
      await axios.patch(`/allcars/${carId}`, formData);
      const res = await axios.get("/allcars");
      const updateCar = res.data.car;
      setAllCar(updateCar);
      navigate("/allcars");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("image", file);
    for (const key in input) {
      if (input[key]) {
        formData.append(key, input[key]);
      }
    }
    return formData;
  };

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmitForm} className="flex flex-col">
        <h1 className="text-center text-lg m-3">Edit Car Form</h1>
        <div className="flex flex-row justify-evenly bg-red-200">
          <div className="bg-green-200">
            <h4>Brand</h4>
            <input
              type="text"
              placeholder="brand"
              className="border bg-slate-50"
              value={brand}
              onChange={(e) => setInput({ ...input, brand: e.target.value })}
              name="brand"
            />
            {error.brand && <InputErrorMessage message={error.brand} />}
            <h4>Model</h4>
            <input
              type="text"
              placeholder="model"
              className="border bg-slate-50"
              value={model}
              onChange={(e) => setInput({ ...input, model: e.target.value })}
              name="model"
            />
            {error.model && <InputErrorMessage message={error.model} />}
            <h4>years</h4>
            <input
              type="text"
              placeholder="years"
              className="border bg-slate-50"
              value={year}
              onChange={(e) => setInput({ ...input, year: e.target.value })}
              name="year"
            />
            {error.year && <InputErrorMessage message={error.year} />}
            <h4>color</h4>
            <input
              type="text"
              placeholder="color"
              className="border bg-slate-50"
              value={color}
              onChange={(e) => setInput({ ...input, color: e.target.value })}
              name="color"
            />
            {error.color && <InputErrorMessage message={error.color} />}
            <h4>mileage</h4>
            <input
              type="text"
              placeholder="mileage"
              className="border bg-slate-50"
              value={mileage}
              onChange={(e) => setInput({ ...input, mileage: e.target.value })}
              name="mileage"
            />
            {error.mileage && <InputErrorMessage message={error.mileage} />}
            <h4>seat</h4>
            <input
              type="text"
              placeholder="seat"
              className="border bg-slate-50"
              value={seat}
              onChange={(e) => setInput({ ...input, seat: e.target.value })}
              name="seat"
            />
            {error.seat && <InputErrorMessage message={error.seat} />}
            <h4>fueltype</h4>
            <input
              type="text"
              placeholder="fuelType"
              className="border bg-slate-50"
              value={fuelType}
              onChange={(e) => setInput({ ...input, fuelType: e.target.value })}
              name="fuelType"
            />
            {error.fuelType && <InputErrorMessage message={error.fuelType} />}
            <h4>transmission</h4>
            <input
              type="text"
              placeholder="transmission"
              className="border bg-slate-50"
              value={transmission}
              onChange={(e) =>
                setInput({ ...input, transmission: e.target.value })
              }
              name="transmission"
            />
            {error.transmission && (
              <InputErrorMessage message={error.transmission} />
            )}
          </div>
          <div>
            <h4>location</h4>
            <input
              type="text"
              placeholder="location"
              className="border bg-slate-50"
              value={location}
              onChange={(e) => setInput({ ...input, location: e.target.value })}
              name="location"
            />
            {error.location && <InputErrorMessage message={error.location} />}
            <h4>price</h4>
            <input
              type="text"
              placeholder="price"
              className="border bg-slate-50"
              value={price}
              onChange={(e) => setInput({ ...input, price: e.target.value })}
              name="price"
            />
            {error.price && <InputErrorMessage message={error.price} />}
            <h4>book price</h4>
            <input
              type="text"
              placeholder="reservePrice"
              className="border bg-slate-50"
              value={reservePrice}
              onChange={(e) =>
                setInput({ ...input, reservePrice: e.target.value })
              }
              name="reservePrice"
            />
            {error.reservePrice && (
              <InputErrorMessage message={error.reservePrice} />
            )}
            <h4>drivetrain</h4>
            <input
              type="text"
              placeholder="drivetrain"
              className="border bg-slate-50"
              value={driveTrain}
              onChange={(e) =>
                setInput({ ...input, driveTrain: e.target.value })
              }
              name="driveTrain"
            />
            {error.driveTrain && (
              <InputErrorMessage message={error.driveTrain} />
            )}
            <h4>description</h4>
            <textarea
              type="text"
              placeholder="description"
              className="border bg-slate-50"
              value={description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              name="description"
            />
            {error.description && (
              <InputErrorMessage message={error.description} />
            )}
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
          <img
            width={500}
            className="mx-auto p-7"
            src={image}
            onClick={() => fileEl.current.click()}
          />
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
