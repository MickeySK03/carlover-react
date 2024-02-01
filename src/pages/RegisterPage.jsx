import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputErrorMessage from "../features/auth/InputErrorMessage";
import axios from "../config/axios";
import { registerSchema } from "../utils/auth-validator";
import regisPic from "../assets/regisPic.jpg";

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const newError = {};
    error.details.map((x) => (newError[x.path[0]] = x.message));
    return newError;
  }
};

export default function RegisterPage() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState({});

  const register = async (registerInputObject) => {
    await axios.post("/auth/register", registerInputObject);
    navigate("/login");
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateRegister(input);
    if (validationError) {
      return setError(validationError);
    }
    setError({});
    register(input).catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  return (
    <div className="flex flex-row justify-center items-start px-3 w-auto mx-auto my-auto">
      <form className="flex flex-col mx-32 my-32" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-14">
          <h1 className="text-center text-3xl font-bold">Register</h1>
        </div>
        <label className="my-2">username</label>
        <div>
          <input
            type="text"
            placeholder="username"
            className={`block w-full border rounded-md outline-none px-3 py-1.5 text-sm focus:ring
            ${
              error.username
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300 focus:border-blue-500 border-gray-300"
            }
    `}
            value={input.username}
            onChange={handleChange}
            name="username"
          />
          {error.username && (
            <InputErrorMessage
              message={
                "username must be at least 6 characters, and must be letters or numbers"
              }
            />
          )}
        </div>
        <label className="my-2">password</label>
        <div>
          <input
            type="password"
            placeholder="password"
            className={`block w-full border rounded-md outline-none px-3 py-1.5 text-sm focus:ring
            ${
              error.password
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300 focus:border-blue-500 border-gray-300"
            }
    `}
            value={input.password}
            onChange={handleChange}
            name="password"
          />
          {error.password && (
            <InputErrorMessage
              message={
                "password must be at least 6 characters, and must be letters or numbers"
              }
            />
          )}
        </div>

        <label className="my-2">confirm password</label>
        <div>
          <input
            type="password"
            placeholder="confirm password"
            className={`block w-full border rounded-md outline-none px-3 py-1.5 text-sm focus:ring
            ${
              error.password
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300 focus:border-blue-500 border-gray-300"
            }
    `}
            value={input.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
          {error.confirmPassword && (
            <InputErrorMessage message={"confirm password doesn't match"} />
          )}
        </div>
        <div className="flex justify-center mt-5">
          <button className="border my-3 rounded-lg bg-blue-300 w-20">
            Register
          </button>
        </div>
      </form>
      <div className="my-auto">
        <img src={regisPic} alt="picLogin" className="h-96" />
      </div>
    </div>
  );
}
