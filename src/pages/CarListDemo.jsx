import calender from "../assets/carDetail/calender.svg";
import wheel from "../assets/carDetail/wheelDrive.svg";
import fuel from "../assets/carDetail/gasStation.svg";
import passenger from "../assets/carDetail/person.svg";
import { Link } from "react-router-dom";
export default function CarListDemo({ carObj, carId }) {
  return (
    <Link to={`/allcars/${carId}`}>
      <div className="flex flex-col border m-3 w-full">
        <img src={carObj.image} alt="alfa" className="w-auto h-60 flex-wrap" />
        <div className="m-3">
          <h1>{carObj.brand}</h1>
          <h1>{carObj.model}</h1>
          <h1>{carObj.price}</h1>
        </div>
        <div className="grid gap-4 grid-cols-2 grid-rows-2 m-3">
          <div className="flex flex-row items-center  ">
            <img src={calender} alt="calender" className="w-7" />
            <p className="ml-3">{carObj.year}</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={wheel} alt="wheel" className="w-7" />
            <p className="ml-3">{carObj.driveTrain}</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={fuel} alt="fuelType" className="w-7" />
            <p className="ml-3">{carObj.fuelType}</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={passenger} alt="passenger" className="w-7" />
            <p className="ml-3">{carObj.seat}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
