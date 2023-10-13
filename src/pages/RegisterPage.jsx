import { Link } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/env";

export default function RegisterPage() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //   const handleChange = (e) => {
  //     const value = e.target.value;
  //     setInput({ ...input, [e.target.name]: value });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      username: input.username,
      email: input.email,
      password: input.password,
      confirmPassword: input.confirmPassword,
      phone: input.phone,
    };
    await axios.post(`${BACKEND_URL}/auth/register`, registerData);
  };
  return (
    <div>
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
      <div className="flex flex-col justify-center items-center min-h-screen -my-10">
        <form
          className="flex flex-col border border-gray-900 px-52 py-32"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Register</h1>
          <label>username</label>
          <input
            type="text"
            placeholder="username"
            className="border"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
          <label>email</label>
          <input
            type="email"
            placeholder="email"
            className="border"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="password"
            className="border"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <label>confirm password</label>
          <input
            type="password"
            placeholder="confirm password"
            className="border"
            value={input.confirmPassword}
            onChange={(e) =>
              setInput({ ...input, confirmPassword: e.target.value })
            }
          />
          <div className="flex justify-center">
            <button className="border my-3 rounded-lg">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
