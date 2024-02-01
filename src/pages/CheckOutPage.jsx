import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import Loading from "../components/Loading";
import validateSchema from "../utils/validate-schema";
import { paymentSchema } from "../utils/product-validator";
import InputErrorMessage from "../features/auth/InputErrorMessage";

export default function CheckOutPage() {
  const [file, setFile] = useState(null);
  const fileEl = useRef(null);
  const [bookcar, setBookCar] = useState([]);
  const { carId } = useParams();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState({ userPhone: "" });
  const [error, setError] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/allcars/${carId}`)
      .then((res) => {
        setBookCar(res.data.detailCar);
      })
      .catch((err) => console.log(err));
  }, [carId]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const result = validateSchema(paymentSchema, payment);
      if (result) {
        return setError(result);
      }
      setError({});
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      if (payment.userPhone) {
        formData.append("userPhone", payment.userPhone);
      }
      setLoading(true);
      await axios.post(`/bookcar/${carId}`, formData);
      navigate(`/booksuccess/${carId}`);
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-[600px] border m-auto">
        <div className="font-extrabold text-xl text-center mt-5">
          จองออนไลน์
        </div>
        <div className="flex flex-col justify-center items-center m-5 h-full">
          <div className="flex flex-row border p-3">
            <img
              src={bookcar.image}
              alt="coverReserveCar"
              className="w-[300px]"
            />
            <div className="ml-5">
              <div className="text-slate-600">
                {bookcar.brand} {bookcar.model}
              </div>
              <div>ปี {bookcar.year}</div>
              <div className="text-blue-600">ราคา {bookcar.price} บาท</div>
            </div>
          </div>

          <form
            onSubmit={handleSubmitForm}
            className="flex flex-col border border-black mt-3 p-10 w-[485px]"
          >
            <div className="flex flex-col justify-center items-center mt-3">
              <div className="font-bold pb-3">Payment</div>
              <img src="/thaiqrpayment.png" alt="" className="w-[200px]" />
            </div>
            {file ? (
              <div
                className="flex justify-center w-full"
                onClick={() => fileEl.current.click()}
              >
                <img width={500} src={URL.createObjectURL(file)} alt="post" />
              </div>
            ) : (
              <>
                <div className="self-center">
                  {err && <InputErrorMessage message={err} />}
                </div>
              </>
            )}
            <input
              type="file"
              className="hidden"
              ref={fileEl}
              onChange={handleImageChange}
            />
            <div
              className="self-center bg-slate-400 w-fit px-3 py-1 rounded-xl cursor-pointer"
              onClick={() => fileEl.current.click()}
            >
              upload slip
            </div>

            <div className="flex flex-col mt-3">
              <div className="flex flex-row">
                <div className="text-red-600 mr-2">*</div>
                <div>เบอร์โทรสำหรับติดต่อกลับ</div>
              </div>
              <input
                type="phone"
                placeholder="phone"
                className="border"
                value={payment.userPhone}
                onChange={(e) =>
                  setPayment({ ...payment, userPhone: e.target.value })
                }
              />
              {error.userPhone && (
                <InputErrorMessage message={"phone number must be 10 digits"} />
              )}
            </div>
            <div className="flex justify-between mt-3">
              <div className="font-bold text-lg">ค่าธรรมเนียมการจอง</div>
              <div className="font-bold text-lg text-cyan-500">
                {bookcar.reservePrice} บาท
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <button className="bg-yellow-200 px-10 py-3 rounded-md">
                ชำระทันที
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
