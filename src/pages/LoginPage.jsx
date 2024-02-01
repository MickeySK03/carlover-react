import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
// import { toast } from "react-toastify";
import InputErrorMessage from "../features/auth/InputErrorMessage";
import loginIcon from "../assets/login3.png";
import RegisterContainer from "../features/auth/RegisterContainer";

export default function LoginPage() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const { login } = useAuth();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    login(input).catch((err) => {
      // toast.error(err.response.data.message);
      setError(err.response.data.message);
    });
  };

  return (
    <div className="flex flex-row justify-center border border-blue-500 rounded-lg px-3 w-[900px] mx-auto my-auto">
      <div className="flex flex-col ml-12 my-auto">
        <div className="flex justify-center mb-12">
          <h1 className="text-xl">Log in</h1>
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
          {error && <InputErrorMessage message={error} />}
        </form>
        <div className="text-center">Need and account?</div>
        {/* <Link to={"/register"}>
          <div className="text-red-800 text-center hover:underline hover:text-red-600">
            Register
          </div>
        </Link> */}
        <div>
          <RegisterContainer />
        </div>
      </div>
      <div className=" rounded-xl">
        <img
          src={loginIcon}
          alt="picLogin"
          className="w-auto h-auto rounded-xl"
        />
      </div>
    </div>
  );
}
