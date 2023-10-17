import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { toast } from "react-toastify";
// import { useAuth } from "../hooks/use-auth";
import InputErrorMessage from "../features/auth/InputErrorMessage";
import axios from "../config/axios";

const registerSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9]{5,30}$/)
    .trim()
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  console.dir(error);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
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

  // const { register } = useAuth();
  const register = async (registerInputObject) => {
    // const res =
    await axios.post("/auth/register", registerInputObject);
    // addAcessToken(res.data.accessToken);
    // setAuthUser(res.data.user);
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
    // navigate("/");
  };
  //   const registerData = {
  //     username: input.username,
  //     email: input.email,
  //     password: input.password,
  //     confirmPassword: input.confirmPassword,
  //     phone: input.phone,
  //   };
  //   await axios.post(`${BACKEND_URL}/auth/register`, registerData);

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center min-h-screen -my-24">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-center">Register</h1>
          <label>username</label>
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
            {error.username && <InputErrorMessage message={error.username} />}
          </div>
          <label>password</label>
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
            {error.password && <InputErrorMessage message={error.password} />}
          </div>

          <label>confirm password</label>
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
              <InputErrorMessage message={error.confirmPassword} />
            )}
          </div>
          <div className="flex justify-center">
            <button className="border my-3 rounded-lg bg-blue-300 w-20">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
