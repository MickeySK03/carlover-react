import { Link } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import Dropdown from "./Dropdown";
import { useAuth } from "../hooks/use-auth";

export default function Header() {
  const { setSearchCar } = useAuth();
  return (
    <div className="bg-yellow-300 flex flex-row justify-between py-2">
      <div className="flex flex-row">
        <div className="mx-5">
          <Link to={"/"}>
            <img src={headerLogo} alt="headerlogo" className="h-10" />
          </Link>
        </div>
        <div className="my-auto mx-3">
          <Link to="/allcars" onClick={() => setSearchCar("")}>
            <button>ดูรถทั้งหมด</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-self-end self-center mr-5">
        <Dropdown />
      </div>
    </div>
  );
}
