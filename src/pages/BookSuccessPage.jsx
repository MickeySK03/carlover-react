import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../config/axios";

export default function BookSuccessPage() {
  const [bookcar, setBookCar] = useState([]);

  useEffect(() => {
    axios
      .get("/userPendingCar")
      .then((res) => {
        setBookCar(res.data.userCar);
      })
      .catch((err) => console.log(err));
  }, [setBookCar]);

  console.log(bookcar);
  return (
    <div className="flex flex-col justify-center items-center py-64">
      <div>
        <div> กรุณารอเจ้าหน้าที่ตรวจสอบสลิป</div>
        <br />
        <div>หมายเลขการจองของคุณคือ {bookcar[0]?.createAt}</div>
        <div>your phone number: {bookcar[0]?.userPhone} </div>
        <Link to="/bookcar">
          <button className="bg-cyan-400 py-1 px-3 rounded-md my-20">
            ดูประวัติการจอง
          </button>
        </Link>
      </div>
    </div>
  );
}
