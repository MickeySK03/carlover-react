import { useLocation, useParams } from "react-router-dom";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import Loading from "../components/Loading";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../components/Modal";

export default function DetailCarPage() {
  const {
    deleteCar,
    authUser,
    loading,
    car,
    setCarId,
    isWishList,
    setIsWishList,
  } = useAuth();
  const { state } = useLocation();
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { carId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCarId(carId);
  }, [carId, setCarId]);

  const createdDate = new Date(car.createAt);
  const formatDate = createdDate.toLocaleDateString("en-GB");
  const price = Number(car.price).toLocaleString();
  const mileage = Number(car.mileage).toLocaleString();

  function TitleLetter(text) {
    if (text) {
      return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
    }
  }

  useEffect(() => {
    if (car.imageCar?.length > 0) {
      const imgs = car.imageCar.map((el) => el.image);
      setImages(imgs);
    }
  }, [car]);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <>
        <div
          onClick={onClick}
          className="hover:bg-white/20 transition duration-150 text-white absolute flex p-6 h-full items-center top-1/2 transform -translate-y-1/2 right-0 text-3xl"
        >
          <FaArrowRight />
        </div>
      </>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="hover:bg-white/20 transition duration-150 text-white absolute flex p-6 h-full items-center top-1/2 transform -translate-y-1/2 left-0 text-3xl z-10"
      >
        <FaArrowLeft />
      </div>
    );
  }

  const settings = {
    customPaging: function (i) {
      return (
        <img
          src={images[i]}
          alt={`Image ${i}`}
          className={`rounded-sm ${
            i === currentSlide ? "border border-gray-100" : "opacity-50"
          }`}
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

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

  const handleClickWishList = async () => {
    await axios.post(`/wishlist/${carId}`);
    setIsWishList(!isWishList);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div className="w-3/5 flex justify-center">
            <div className="w-full">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div key={index} className="!flex justify-center bg-gray-700">
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className="w-4/5 object-contain relative"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-2/5 m-3">
            <div className="flex flex-row items-baseline gap-2">
              <div className="text-2xl ">{car.year}</div>
              <div className="font-bold text-2xl ">
                {TitleLetter(car.brand)}
              </div>
              <div className="text-xl">{TitleLetter(car.model)}</div>
            </div>
            <div className="text-blue-700 text-xl">ราคา {price} บาท</div>
            <div className="flex flex-row gap-2 text-lg">
              <div>สถานที่:</div>
              <div>{car.location}</div>
            </div>
            <div className="flex flex-row gap-2 text-lg">
              <div className="text-lg">วันที่ลงขาย: </div>
              <div>{formatDate}</div>
            </div>
            <div className="flex flex-row gap-2 text-lg">
              <div>รายละเอียด:</div>
              <div>{car.description}</div>
            </div>

            <div className="flex flex-row justify-around border mt-10">
              <hr />
              <div className="flex flex-col w-full ">
                <div className="flex flex-row justify-between mx-10">
                  <div>Color</div>
                  <div className="font-bold">{TitleLetter(car.color)}</div>
                </div>
                <hr />
                <div className="flex flex-row justify-between mx-10">
                  <div>Mileage</div>
                  <div className="font-bold">{mileage}</div>
                </div>
                <hr />
                <div className="flex flex-row justify-between mx-10">
                  <div>Drivetrain</div>
                  <div className="font-bold">{TitleLetter(car.driveTrain)}</div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between mx-10">
                  <div>FuelType</div>
                  <div className="font-bold">{TitleLetter(car.fuelType)}</div>
                </div>
                <hr />
                <div className="flex flex-row justify-between mx-10">
                  <div>Transmission</div>
                  <div className="font-bold">
                    {TitleLetter(car.transmission)}
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-between mx-10">
                  <div>Seat</div>
                  <div className="font-bold">{car.seat}</div>
                </div>
              </div>
            </div>
            {authUser.role === "ADMIN" ? (
              <div className="mt-20">
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
              <div className="flex justify-around mt-20">
                <div className="flex flex-row gap-2 mt-3">
                  <FaHeart
                    className={`flex justify-center text-2xl cursor-pointer ${
                      isWishList ? "text-red-500" : "text-slate-400"
                    }`}
                    onClick={handleClickWishList}
                  />
                  รายการโปรด
                </div>
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

        {car.isReserve === true ? (
          <>
            <button
              className="fixed self-center bottom-32 bg-green-400 py-2 px-3 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              ดูหลักฐานการชำระเงิน
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <div className=" flex flex-col justify-center items-center mt-10">
                <div className="font-semibold mb-4">หลักฐานการชำระเงิน</div>
                <img
                  src={car.reserveCar[0]?.image}
                  alt=""
                  className="w-[300px]"
                />
              </div>
            </Modal>
          </>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </>
  );
}
