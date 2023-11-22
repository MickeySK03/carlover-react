import { useState, useEffect } from "react";
import axios from "../../config/axios";
import Loading from "../../components/Loading";
import UserPendingCarForm from "./UserPendingCarForm";

export default function UserPendingCarPage() {
  const [adminCar, setAdminCar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/adminPendingCar")
      .then((res) => {
        setAdminCar(res.data.pendingCar);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [setAdminCar]);
  // console.log(adminCar);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen">
        <h1 className="text-center mt-3 font-extrabold text-xl">
          รถที่รอตรวจสอบการชำระเงิน
        </h1>
        <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-1  mx-10 mb-3">
          {adminCar.map((el) => (
            <UserPendingCarForm
              adminCar={adminCar}
              key={el.id}
              carObj={el}
              carId={el.carId}
            />
          ))}
        </div>
      </div>
    </>
  );
}
