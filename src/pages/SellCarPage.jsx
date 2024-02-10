import { useState, useRef } from "react";
import Loading from "../components/Loading";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import InputErrorMessage from "../features/auth/InputErrorMessage";
import { createProductSchema } from "../utils/product-validator";
import validateSchema from "../utils/validate-schema";

export default function SellCarPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [err, setErr] = useState("");
  const [files, setFiles] = useState([]);
  const fileEl = useRef(null);
  const { loading, setLoading, setAllCar } = useAuth();
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
    const newFile = [...files, ...e.target.files];
    setFiles(newFile);
  };

  const deleteImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
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
      const res = await axios.post("/sellcar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newPost = res.data.post;
      setAllCar(newPost);
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
    for (const key in files) {
      formData.append("image", files[key]);
    }
    for (const key in carDetails) {
      if (carDetails[key]) {
        formData.append(key, carDetails[key]);
      }
    }
    return formData;
  };

  console.log(files);

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmitForm}>
        <div className="text-center text-lg m-3">Sell Car</div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-center items-center">
            <div className="w-1/2 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-1">
                {Array.from(files).map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="h-40 object-cover mx-auto"
                    />
                    <div
                      onClick={() => {
                        deleteImage(index);
                      }}
                      className={`flex justify-center absolute top-0 right-2 w-7 aspect-square rounded-full bg-white border-2 cursor-pointer`}
                    >
                      x
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <div
                  onClick={() => fileEl.current.click()}
                  className="cursor-pointer border bg-orange-300 rounded-md px-3 py-1"
                >
                  select image
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  ref={fileEl}
                  multiple
                />
              </div>
              <div>{err && <InputErrorMessage message={err} />}</div>
              <div className="flex flex-row justify-center">
                <div
                  className={`${
                    files.length > 5 ? "text-red-600" : "text-black"
                  }`}
                >
                  select {files.length}
                </div>
                <div>/5 images</div>
              </div>
              <div className="flex justify-center">
                {files.length > 5 ? (
                  <div className="text-red-500">
                    cannot upload more than 5 images
                  </div>
                ) : (
                  <div className="hidden"></div>
                )}
              </div>
            </div>
            <div className="w-1/2 m-3">
              <div className="font-bold mx-3">Brand</div>
              <input
                name="brand"
                type="text"
                placeholder="brand"
                className="border bg-slate-50"
                value={carDetails.brand}
                onChange={handleChange}
              />
              {error.brand && <InputErrorMessage message={error.brand} />}
              <div className="font-bold mx-3">Model</div>
              <input
                name="model"
                type="text"
                placeholder="model"
                className="border bg-slate-50"
                value={carDetails.model}
                onChange={handleChange}
              />
              {error.model && <InputErrorMessage message={error.model} />}
              <div className="font-bold mx-3">Years</div>
              <input
                name="year"
                type="text"
                placeholder="years"
                className="border bg-slate-50"
                value={carDetails.year}
                onChange={handleChange}
              />
              {error.year && <InputErrorMessage message={error.year} />}
              <div className="font-bold mx-3">Price</div>
              <input
                name="price"
                type="text"
                placeholder="price"
                className="border bg-slate-50"
                value={carDetails.price}
                onChange={handleChange}
              />
              {error.price && <InputErrorMessage message={error.price} />}
              <div className="font-bold mx-3">Book Price</div>
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
              <div className="font-bold mx-3">Location</div>
              <input
                name="location"
                type="text"
                placeholder="location"
                className="border bg-slate-50"
                value={carDetails.location}
                onChange={handleChange}
              />
              {error.location && <InputErrorMessage message={error.location} />}
              <div className="font-bold mx-3">Description</div>
              <input
                name="description"
                type="text"
                placeholder="description"
                className="border bg-slate-50"
                value={carDetails.description}
                onChange={handleChange}
              />
              {error.description && (
                <InputErrorMessage message={error.description} />
              )}
            </div>
          </div>

          <div className="flex flex-row justify-center w-auto border mt-5">
            <hr />
            <div className="flex flex-col  ">
              <div className="flex flex-row  mx-10">
                <div className="font-bold mx-3 w-20">Color</div>
                <input
                  name="color"
                  type="text"
                  placeholder="color"
                  className="border bg-slate-50"
                  value={carDetails.color}
                  onChange={handleChange}
                />
                {error.color && <InputErrorMessage message={error.color} />}
              </div>
              <hr />
              <div className="flex flex-row  mx-10">
                <div className="font-bold mx-3 w-20">Mileage</div>
                <input
                  name="mileage"
                  type="text"
                  placeholder="mileage"
                  className="border bg-slate-50"
                  value={carDetails.mileage}
                  onChange={handleChange}
                />
                {error.mileage && <InputErrorMessage message={error.mileage} />}
              </div>
              <hr />
              <div className="flex flex-row  mx-10">
                <div className="font-bold mx-3 w-20">Drivetrain</div>
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
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row mx-10">
                <div className="font-bold mx-3 w-24">Drivetrain</div>
                <input
                  name="fuelType"
                  type="text"
                  placeholder="fuelType"
                  className="border bg-slate-50"
                  value={carDetails.fuelType}
                  onChange={handleChange}
                />
                {error.fuelType && (
                  <InputErrorMessage message={error.fuelType} />
                )}
              </div>
              <hr />
              <div className="flex flex-row mx-10">
                <div className="font-bold mx-3 w-24">Transmission</div>
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
              <hr />
              <div className="flex flex-row mx-10">
                <div className="font-bold mx-3 w-24">Seat</div>
                <input
                  name="seat"
                  type="text"
                  placeholder="seat"
                  className="border bg-slate-50"
                  value={carDetails.seat}
                  onChange={handleChange}
                />
                {error.seat && <InputErrorMessage message={error.seat} />}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button className="border bg-blue-300 shadow-xl px-6 py-2 rounded-md m-3 hover:bg-blue-400">
              ลงขาย
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

// function SelectImageButton({ onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-gray-200 hover:bg-gray-300 rounded-lg py-12 flex flex-col items-center cursor-pointer mx-80"
//     >
//       <div className="bg-gray-400 h-10 w-10 rounded-full flex items-center justify-center">
//         <ImageIcon />
//       </div>
//       <span>Add photo</span>
//     </div>
//   );
// }
