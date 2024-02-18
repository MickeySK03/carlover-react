import { useState, useRef, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";
import { useNavigate, useParams } from "react-router-dom";
import validateSchema from "../utils/validate-schema";
import { createProductSchema } from "../utils/product-validator";
import InputErrorMessage from "../features/auth/InputErrorMessage";

export default function EditCarPage() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const fileEl = useRef(null);
  const [img, setImg] = useState([]);
  const [delImg, setDelImg] = useState([]);
  const { loading, setLoading, setAllCar, setCar } = useAuth();
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
  });

  useEffect(() => {
    axios
      .get(`/allcars/${carId}`)
      .then((res) => {
        setInput(res.data.detailCar);
        setImg(res.data.detailCar.imageCar);
      })
      .catch((err) => console.log("Error fetching car detail:", err));
  }, [carId]);

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
  } = input;

  const imageLength = files.length + img.length;
  const navigate = useNavigate();

  const deleteOldImage = (index) => {
    const orginalImage = [...img];
    const deleteImage = [...delImg, orginalImage[index]];
    setDelImg(deleteImage);
    orginalImage.splice(index, 1);
    setImg(orginalImage);
  };

  const deleteImage = (index) => {
    const newFile = [...files];
    newFile.splice(index, 1);
    setFiles(newFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleImageChange = (e) => {
    const newFile = [...files, ...e.target.files];
    setFiles(newFile);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      delete input.createAt;
      delete input.id;
      delete input.isReserve;
      delete input.imageCar;
      const result = validateSchema(createProductSchema, input);
      if (result) {
        return setError(result);
      }
      setLoading(true);
      const formData = createFormData();
      const resCarId = await axios.patch(`/allcars/${carId}`, formData);
      const updateCarId = resCarId.data.updateCar;
      const res = await axios.get(`/allcars`);
      const updateCar = res.data.car;
      setAllCar(updateCar);
      setCar(updateCarId);
      navigate("/allcars");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    if (files.length > 0) {
      for (const key in files) {
        formData.append("image", files[key]);
      }
    }
    for (const key in input) {
      if (input[key]) {
        formData.append(key, input[key]);
      }
    }
    if (delImg.length > 0) {
      delImg.map((file) => {
        formData.append("deleteImage", file.id);
      });
    }
    return formData;
  };

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmitForm}>
        <div className="text-center text-lg m-3">Edit Car Form</div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-center items-center">
            <div className="w-1/2 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-1">
                {Array.from(img).map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      key={index}
                      src={file.image}
                      alt={`Preview ${index}`}
                      className="h-40 object-cover mx-auto"
                    />
                    <div
                      onClick={() => {
                        deleteOldImage(index);
                      }}
                      className={`flex justify-center absolute top-0 right-2 w-7 aspect-square rounded-full bg-white border-2 cursor-pointer`}
                    >
                      x
                    </div>
                  </div>
                ))}
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
              <div>{error && <InputErrorMessage message={error} />}</div>
              <div className="flex flex-row justify-center">
                <div
                  className={`${
                    imageLength > 5 ? "text-red-600" : "text-black"
                  }`}
                >
                  select {imageLength}
                </div>
                <div>/5 images</div>
              </div>
              <div className="flex justify-center">
                {imageLength > 5 ? (
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
                value={brand}
                onChange={handleChange}
              />
              {error.brand && <InputErrorMessage message={error.brand} />}
              <div className="font-bold mx-3">Model</div>
              <input
                name="model"
                type="text"
                placeholder="model"
                className="border bg-slate-50"
                value={model}
                onChange={handleChange}
              />
              {error.model && <InputErrorMessage message={error.model} />}
              <div className="font-bold mx-3">Years</div>
              <input
                name="year"
                type="text"
                placeholder="years"
                className="border bg-slate-50"
                value={year}
                onChange={handleChange}
              />
              {error.year && <InputErrorMessage message={error.year} />}
              <div className="font-bold mx-3">Price</div>
              <input
                name="price"
                type="text"
                placeholder="price"
                className="border bg-slate-50"
                value={price}
                onChange={handleChange}
              />
              {error.price && <InputErrorMessage message={error.price} />}
              <div className="font-bold mx-3">Book Price</div>
              <input
                name="reservePrice"
                type="text"
                placeholder="reservePrice"
                className="border bg-slate-50"
                value={reservePrice}
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
                value={location}
                onChange={handleChange}
              />
              {error.location && <InputErrorMessage message={error.location} />}
              <div className="font-bold mx-3">Description</div>
              <input
                name="description"
                type="text"
                placeholder="description"
                className="border bg-slate-50"
                value={description}
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
                  value={color}
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
                  value={mileage}
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
                  value={driveTrain}
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
                  value={fuelType}
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
                  value={transmission}
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
                  value={seat}
                  onChange={handleChange}
                />
                {error.seat && <InputErrorMessage message={error.seat} />}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button className="border bg-blue-300 px-3 rounded-md m-3">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
