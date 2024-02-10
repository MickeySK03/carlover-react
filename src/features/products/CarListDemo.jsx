import calender from "../../assets/carDetail/calender.svg";
import wheel from "../../assets/carDetail/wheelDrive.svg";
import fuel from "../../assets/carDetail/gasStation.svg";
import passenger from "../../assets/carDetail/seat.svg";
import { Link } from "react-router-dom";

export default function CarListDemo({ carObj }) {
  const price = Number(carObj.price).toLocaleString();

  return (
    <Link to={`/allcars/${carObj.id}`}>
      <div className="border rounded-lg m-3 overflow-hidden hover:translate-y-5 hover:ring ring-sky-700">
        <div className="object-cover">
          <img
            src={
              carObj.imageCar && carObj.imageCar.length > 0
                ? carObj.imageCar[0].image
                : ""
            }
            alt="ImgCar"
            className="w-full h-64"
          />
        </div>
        <div className="m-3">
          <h1>ยี่ห้อ {carObj.brand}</h1>
          <h1>รุ่น {carObj.model}</h1>
          <h1>ราคา {price} บาท</h1>
        </div>
        <div className="grid gap-4 grid-cols-2 grid-rows-2 m-3">
          <div className="flex flex-row items-center  ">
            <img src={calender} alt="calender" className="w-7" />
            <p className="ml-3">ปี {carObj.year}</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={wheel} alt="wheel" className="w-7" />
            <p className="ml-3">ระบบขับเคลื่อน {carObj.driveTrain}</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={fuel} alt="fuelType" className="w-7" />
            <p className="ml-3">{carObj.fuelType}</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={passenger} alt="passenger" className="w-7" />
            <p className="ml-3">จำนวนที่นั่ง {carObj.seat}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
