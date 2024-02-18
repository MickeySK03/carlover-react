import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import Dropdown from "./Dropdown";
import { IoMdSearch } from "react-icons/io";
import { useAuth } from "../hooks/use-auth";

export default function HeaderSearch() {
  const { allCar, setResultCar, searchCar, setSearchCar } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchCar(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    const result = allCar.filter(
      (car) =>
        car.brand.toLowerCase().includes(searchCar.toLowerCase()) ||
        car.model.toLowerCase().includes(searchCar.toLowerCase())
    );
    setResultCar(result);
    navigate(`/searchcar`);
  };

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
      <div className="flex flex-row my-auto gap-2">
        <div className="flex text-2xl">
          <IoMdSearch />
        </div>
        <form className="my-auto felx flex-row" onSubmit={search}>
          <input
            type="text"
            placeholder="Search car by name..."
            className="rounded-md outline-blue-500"
            value={searchCar}
            onChange={handleChange}
          />
          <button className="mx-3 bg-blue-600 rounded-md px-2 text-stone-50">
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-row justify-self-end self-center mr-5">
        <Dropdown />
      </div>
    </div>
  );
}
