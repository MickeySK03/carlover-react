// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { toast } from "react-toastify";
// import axios from "axios";

export default function LoginPage() {
  // const Navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    login(input).catch((err) => {
      toast.error(err.response.data.message);
    });
    // const userData = {
    //   username: input.username,
    //   password: input.password,
    // };
    //   axios
    //     .post("http://localhost:8483/auth/login", userData)
    //     .then(function (res) {
    //       console.log(res);
    //       console.log(res.status);
    //       console.log("successfully Logged in");
    //       if (res.status === 200) {
    //         Navigate("/");
    //       }
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
  };

  return (
    <div className="">
      <div className="flex flex-row justify-center items-start my-3 border border-gray-900 px-3 py-12 w-fit mx-auto">
        <div className="mx-5">
          <div className="flex justify-center mt-12 mb-12">
            <h1>Log in</h1>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmitForm}>
            <label className="text-center">username</label>
            <input
              type="text"
              placeholder="username"
              className="border w-60"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
            <label className="text-center">password</label>
            <input
              type="password"
              placeholder="password"
              className="border w-60"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <div className="flex justify-center">
              <button className="border px-3 py-2 bg-blue-300 my-3 rounded-lg w-60">
                LogIn
              </button>
            </div>
          </form>
        </div>
        <div className="border bg-black">
          <img src="/jaguar/jaguarLogin.png" alt="picLogin" className="h-96" />
        </div>
      </div>
    </div>
  );
}
