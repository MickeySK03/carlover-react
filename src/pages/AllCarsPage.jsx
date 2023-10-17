import { Link } from "react-router-dom";
import CarListDemo from "./CarListDemo";

export default function AllCarsPage() {
  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="search"
          className="w-screen mx-10 border my-2"
        />
      </div>
      <div className="grid gap-4 grid-cols-3 grid-rows-4 mx-10 mb-3">
        <Link to={"/Detailcar"}>
          <CarListDemo />
        </Link>
        <Link to={"/Detailcar"}>
          <CarListDemo />
        </Link>
        <Link to={"/Detailcar"}>
          <CarListDemo />
        </Link>
        <CarListDemo />
        <CarListDemo />
        <CarListDemo />
        <CarListDemo />
        <CarListDemo />
        <CarListDemo />
        <CarListDemo />
        <CarListDemo />
        <CarListDemo />
      </div>
    </div>
  );
}
