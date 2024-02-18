import { useEffect, useState } from "react";
import axios from "../config/axios";
import UserWishListCarForm from "../features/user/UserWishListCarForm";

export default function UserWishListCarPage() {
  const [userWishListCar, setUserWishListCar] = useState([]);
  useEffect(() => {
    axios
      .get("/wishlist")
      .then((res) => {
        setUserWishListCar(res.data.wishList);
      })
      .catch((err) => console.log(err));
  }, [setUserWishListCar]);

  return (
    <div className="">
      <h1 className="font-extrabold text-xl text-center mt-5">รายการโปรด</h1>
      {userWishListCar.length > 0 ? (
        <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-1  mx-10 mb-3">
          {userWishListCar.map((el) => (
            <UserWishListCarForm
              userCar={userWishListCar}
              key={el.id}
              carObj={el}
              carId={el.carId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">ไม่มีรถในรายการโปรด</div>
      )}
    </div>
  );
}
