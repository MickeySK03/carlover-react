import { useState, useEffect } from "react";
import axios from "../config/axios";
import Loading from "../components/Loading";
import AdminPendingCarForm from "../features/admin/AdminPendingCarForm";
import { useAuth } from "../hooks/use-auth";

export default function AdminPendingCarPage() {
  const [adminCar, setAdminCar] = useState([]);
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    axios
      .get("/adminPendingCar")
      .then((res) => {
        setAdminCar(res.data.pendingCar);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [setAdminCar, setLoading]);

  // console.log(adminCar);

  return (
    <>
      {loading && <Loading />}
      <div className="">
        <h1 className="text-center mt-3 font-extrabold text-xl">
          รถที่รอตรวจสอบการชำระเงิน
        </h1>
        {adminCar.length > 0 ? (
          <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-1  mx-10 mb-3">
            {adminCar.map((el) => (
              <AdminPendingCarForm
                adminCar={adminCar}
                key={el.id}
                carObj={el}
                carId={el.carId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">ไม่มีรถที่รอการชำระเงิน</div>
        )}
      </div>
    </>
  );
}
