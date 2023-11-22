import bodyPic from "../assets/Used-Car-Home.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import CarouselPage from "./CarouselPage";
import Loading from "../components/Loading";

export default function HomePage() {
  const { allCar, setAllCar } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/allcars")
      .then((res) => {
        setAllCar(res.data.car);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setAllCar]);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen max-w-full">
        <div className="flex justify-center">
          <img src={bodyPic} alt="usecarhome" className="items-center" />
        </div>
        <div className="text-end mx-6">
          <Link to="/allcars">
            <button>ดูเพิ่มเติม</button>
          </Link>
        </div>
        <div className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
          {allCar.map((el) => (
            <CarouselPage
              allCar={allCar}
              key={el.id}
              carObj={el}
              carId={el.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
