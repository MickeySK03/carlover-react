import calender from "../assets/carDetail/calender.svg";
import wheel from "../assets/carDetail/wheelDrive.svg";
import fuel from "../assets/carDetail/gasStation.svg";
import passenger from "../assets/carDetail/person.svg";
export default function CarListDemo() {
  return (
    <div className="border">
      <img src="/alfa.jpeg" alt="alfa" />
      <div className="m-3">
        <h1>Alfa Romeo 2000GT Veloce</h1>
        <h1>566,900 บาท</h1>
      </div>
      <div className="grid gap-4 grid-cols-2 grid-rows-2 m-3">
        <div className="flex flex-row items-center  ">
          <img src={calender} alt="calender" className="w-7" />
          <p className="ml-3">1976</p>
        </div>
        <div className="flex flex-row items-center">
          <img src={wheel} alt="wheel" className="w-7" />
          <p className="ml-3">Rear-Wheel-Drive</p>
        </div>
        <div className="flex flex-row items-center">
          <img src={fuel} alt="fuelType" className="w-7" />
          <p className="ml-3">เบนซิน</p>
        </div>
        <div className="flex flex-row items-center">
          <img src={passenger} alt="passenger" className="w-7" />
          <p className="ml-3">4</p>
        </div>
      </div>
    </div>
  );
}
