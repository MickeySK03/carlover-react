import CarListDemo from "./CarListDemo";
import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import Loading from "../components/Loading";

export default function AllCarsPage() {
  const { allCar, setAllCar, deleteCar } = useAuth();
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
      <div className="min-h-screen">
        <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-3  mx-10 mb-3">
          {allCar.map((el) => (
            <CarListDemo
              key={el.id}
              allCar={allCar}
              carObj={el}
              carId={el.id}
              deleteCar={deleteCar}
            />
          ))}
        </div>
      </div>
    </>
  );
}
