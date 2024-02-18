import { useEffect, useState } from "react";
import UserBookCarForm from "../features/user/UserBookCarForm";

import axios from "../config/axios";

export default function UserBookCarPage() {
  const [userCar, setUserCar] = useState([]);
  useEffect(() => {
    axios
      .get("/usercar")
      .then((res) => {
        setUserCar(res.data.userCar);
      })
      .catch((err) => console.log(err));
  }, [setUserCar]);

  return (
    <div className="">
      <h1 className="font-extrabold text-xl text-center mt-5">รถที่คุณจอง</h1>
      {userCar.length > 0 ? (
        <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-1  mx-10 mb-3">
          {userCar.map((el) => (
            <UserBookCarForm
              userCar={userCar}
              key={el.id}
              carObj={el}
              carId={el.carId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">ไม่มีรถที่คุณจอง</div>
      )}
    </div>
  );
}
