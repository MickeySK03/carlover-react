import { Link } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import avatar from "../assets/avatar.svg";
import { useAuth } from "../hooks/use-auth";

export default function Header() {
  const { logout, authUser } = useAuth();
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
        <div className="my-auto mx-3">
          <Link to="/sellcar">
            <button>ขายรถ</button>
          </Link>
        </div>
      </div>
      <div className="mx-5 my-auto flex flex-row">
        <img src={avatar} alt="avatar" className="h-6" />
        {!authUser ? (
          <div>
            <Link to={"/login"}>
              <button className=" mx-5">Login</button>
            </Link>
            <Link to={"/register"}>
              <button>Register</button>
            </Link>
          </div>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>
    </div>
  );
}
