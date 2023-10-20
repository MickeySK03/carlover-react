import bodyPic from "../assets/Used-Car-Home.png";
import { Link } from "react-router-dom";
// import CarListDemo from "./CarListDemo";

export default function HomePage() {
  return (
    <div>
      <div className="flex justify-center">
        <img src={bodyPic} alt="usecarhome" className="items-center" />
      </div>
      <div className="text-end mx-6">
        <Link to="/allcars">
          <button>ดูเพิ่มเติม</button>
        </Link>
      </div>
      {/* <div className="grid gap-4 grid-cols-3 grid-rows-1 mx-10 my-3">
        <Link to={"/detailcar"}>
          <CarListDemo />
        </Link>
        <Link to={"/detailcar"}>
          <CarListDemo />
        </Link>
        <Link to={"/detailcar"}>
          <CarListDemo />
        </Link>
      </div> */}
    </div>
  );
}
