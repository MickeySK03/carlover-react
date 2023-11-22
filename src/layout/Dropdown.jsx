import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.svg";

export default function Dropdown() {
  const { logout, authUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownEl = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropDownEl.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropDownEl}>
      <div
        className="flex flex-row cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={avatar} alt="avatar" className="h-6 mr-2" />
        {!authUser ? <h1>login/register</h1> : <div>{authUser.username}</div>}
      </div>
      {isOpen && (
        <div>
          {!authUser ? (
            <div className="w-28 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl">
              <div>
                <Link to={"/login"} onClick={() => setIsOpen(false)}>
                  <div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
                    <button>Login</button>
                  </div>
                </Link>
              </div>
              <div>
                <Link to={"/register"} onClick={() => setIsOpen(false)}>
                  <div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
                    <button>Register</button>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {authUser.role == "ADMIN" ? (
                <div className="w-44 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl">
                  <div>
                    <Link
                      to={"/adminpendingcar"}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
                        <button>ตรวจสอบการชำระเงิน</button>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link to={"/adminbookcar"} onClick={() => setIsOpen(false)}>
                      <div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
                        <button>ประวัติการจองทั้งหมด</button>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link to="/sellcar">
                      <div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
                        <button>ลงขายรถ</button>
                      </div>
                    </Link>
                  </div>
                  <hr className="mx-2 border" />
                  <div
                    className="flex gap-4 p-2 items-center cursor-pointer rounded-xl hover:bg-gray-100"
                    onClick={logout}
                  >
                    <div>logout</div>
                  </div>
                </div>
              ) : (
                <div className="w-44 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl">
                  <div>
                    <Link to={"/bookcar"} onClick={() => setIsOpen(false)}>
                      <div className="flex px-3 gap-4 py-2 items-center rounded-xl hover:bg-gray-100">
                        <button>ประวัติการจอง</button>
                      </div>
                    </Link>
                  </div>
                  <hr className="mx-2 border" />
                  <div
                    className="flex px-3 gap-4 py-2 items-center cursor-pointer rounded-xl hover:bg-gray-100"
                    onClick={logout}
                  >
                    <div>logout</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
