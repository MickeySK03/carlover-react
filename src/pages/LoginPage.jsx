import { Link } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const userData = {
      username: input.username,
      password: input.password,
    };
    await axios.post("http://localhost:8483/auth/login", userData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-neutral-300 flex flex-row justify-between py-2">
        <div className="mx-5">
          <Link to={"/"}>
            <img src={headerLogo} alt="headerlogo" className="h-10" />
          </Link>
        </div>
        <div className="mx-5 my-auto">
          <Link to={"/login"}>
            <button className=" mx-5">Login</button>
          </Link>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row flex-grow justify-evenly items-center my-3 border border-gray-900 mx-auto ">
        <div className="mx-14">
          <form className="flex flex-col" onSubmit={handleSubmitForm}>
            <label className="text-center">username</label>
            <input
              type="text"
              placeholder="username"
              className="border"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
            <label className="text-center">password</label>
            <input
              type="password"
              placeholder="password"
              className="border"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <div className="flex justify-center">
              <button className="border my-3 rounded-lg">LogIn</button>
            </div>
          </form>
        </div>
        <div className="border p-11 mx-14">
          <h1 className="text-center">Login</h1>
        </div>
      </div>
      <div className="bg-black flex flex-col flex-grow-0 justify-center items-center">
        <img src="/footer.png" alt="footer" className="h-60" />
        <h1 className="text-white">2023 CarLoverTH.All Rights reserved</h1>
      </div>
    </div>
  );
}
