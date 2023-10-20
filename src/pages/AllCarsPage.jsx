import CarListDemo from "./CarListDemo";
import axios from "../config/axios";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

export default function AllCarsPage() {
  const { allCar, setAllCar, deleteCar } = useAuth();

  useEffect(() => {
    axios
      .get("/allcars")
      .then((res) => {
        setAllCar(res.data.car);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setAllCar]);

  return (
    <div className="min-h-screen">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="search"
          className="w-screen mx-10 border my-2"
        />
      </div>
      <div className="grid gap-4 grid-cols-3 grid-rows-3 mx-10 mb-3">
        {allCar.map((el) => (
          <CarListDemo
            allCar={allCar}
            key={el.id}
            carObj={el}
            carId={el.id}
            deleteCar={deleteCar}
          />
        ))}
      </div>
    </div>
  );
}
