import { Link } from "react-router-dom";
import calender from "../../assets/carDetail/calender.svg";
import wheel from "../../assets/carDetail/wheelDrive.svg";
import fuel from "../../assets/carDetail/gasStation.svg";
import passenger from "../../assets/carDetail/person.svg";
import TitleLetter from "../../components/TitleLetter";
import LocaleString from "../../components/LocaleString";

export default function UserWishListCarForm({ carObj, carId }) {
  return (
    <Link to={`/allcars/${carId}`}>
      <div className="flex flex-row border rounded-lg overflow-hidden h-auto w-auto m-3 bg-white shadow-md">
        <div className="h-auto w-1/4 overflow-hidden">
          <img
            src={carObj.car.imageCar[0]?.image}
            alt="ImgCar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col h-auto w-3/5 p-4">
          <h1 className="text-2xl font-semibold mb-2">
            <TitleLetter text={carObj.car.brand} /> รุ่น {carObj.car.model}
          </h1>
          <div className="text-xl text-orange-500 mb-4">
            ราคา <LocaleString number={carObj.car.price} /> บาท
          </div>
          <div className="grid gap-4 grid-cols-2 grid-rows-2 ml-20">
            <div className="flex items-center">
              <img src={calender} alt="calender" className="w-1/6" />
              <div className="ml-3">ปี {carObj.car.year}</div>
            </div>
            <div className="flex items-center">
              <img src={wheel} alt="wheel" className="w-1/6" />
              <p className="ml-3">ระบบขับเคลื่อน {carObj.car.driveTrain}</p>
            </div>
            <div className="flex items-center">
              <img src={fuel} alt="fuelType" className="w-1/6" />
              <p className="ml-3">{carObj.car.fuelType}</p>
            </div>
            <div className="flex items-center">
              <img src={passenger} alt="passenger" className="w-1/6" />
              <p className="ml-3">จำนวนที่นั่ง {carObj.car.seat}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around items-end h-auto w-1/5 p-4">
          <div className="text-lg font-bold text-blue-700">
            ราคาจอง: <LocaleString number={carObj.car.reservePrice} /> บาท
          </div>
        </div>
      </div>
    </Link>
  );
}
