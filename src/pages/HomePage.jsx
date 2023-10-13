import { Link } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import bodyPic from "../assets/Used-Car-Home.png";
import avatar from "../assets/avatar.svg";
import calender from "../assets/carDetail/calender.svg";
import wheel from "../assets/carDetail/wheelDrive.svg";
import fuel from "../assets/carDetail/gasStation.svg";
import passenger from "../assets/carDetail/person.svg";

export default function HomePage() {
  return (
    <div>
      <div className="bg-neutral-300 flex flex-row justify-between py-2">
        <div className="mx-5">
          <Link to={"/"}>
            <img src={headerLogo} alt="headerlogo" className="h-10" />
          </Link>
        </div>
        <div className="mx-5 my-auto flex flex-row">
          <img src={avatar} alt="avatar" className="h-6" />
          <Link to={"/login"}>
            <button className=" mx-5">Login</button>
          </Link>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={bodyPic} alt="usecarhome" className="items-center" />
      </div>
      <div className="grid gap-4 grid-cols-3 grid-rows-1 mx-10">
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
        <div className="border">
          <img src="/bmwg30.jpeg" alt="bmw" />
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
        <div className="border">
          <img src="/jaguar-xj6.jpeg" alt="jaguar" />
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
      </div>
      <div className="bg-black flex flex-col justify-center items-center mt-4">
        <img src="/footer.png" alt="footer" className="h-60" />
        <h1 className="text-white">2023 CarLoverTH.All Rights reserved</h1>
      </div>
    </div>
  );
}
