import { useState, useEffect } from "react";
import axios from "../../config/axios";
import AdminBookCarForm from "./AdminBookCarForm";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

export default function AdminBookCarPage() {
  const [adminCar, setAdminCar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/admincar")
      .then((res) => {
        setAdminCar(res.data.adminCar);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [setAdminCar]);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen">
        <h1 className="text-center mt-3 font-extrabold text-xl">
          รถทั้งหมดที่ User จอง
        </h1>
        <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-1  mx-10 mb-3">
          {adminCar.map((el) => (
            <Link to={`/allcars/${el.carId}`} key={el.id}>
              <AdminBookCarForm
                adminCar={adminCar}
                carObj={el}
                carId={el.carId}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
