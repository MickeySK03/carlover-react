import { Link } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import Dropdown from "./Dropdown";
import { IoMdSearch } from "react-icons/io";

export default function HeaderSearch() {
  return (
    <div className="bg-yellow-300 flex flex-row justify-between py-2">
      <div className="flex flex-row">
        <div className="mx-5">
          <Link to={"/"}>
            <img src={headerLogo} alt="headerlogo" className="h-10" />
          </Link>
        </div>
        <div className="my-auto mx-3">
          <Link to="/allcars">
            <button>ดูรถทั้งหมด</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row my-auto gap-2">
        <div className="flex text-2xl">
          <IoMdSearch />
        </div>
        <div className="my-auto felx flex-row">
          <input
            type="text"
            placeholder="Search car by name..."
            className="rounded-md outline-blue-500"
          />
          <button className="mx-3 bg-blue-600 rounded-md px-2 text-stone-50">
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-self-end self-center mr-5">
        <Dropdown />
      </div>
    </div>
  );
}
