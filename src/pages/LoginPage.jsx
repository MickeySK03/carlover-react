import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
// import { toast } from "react-toastify";
import InputErrorMessage from "../features/auth/InputErrorMessage";
import jaguar from "../assets/jaguar2.jpeg";

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
    <div className="flex justify-center items-start border border-gray-900 px-3 py-10 w-[800px]  mx-auto">
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
          {error && <InputErrorMessage message={error} />}
        </form>
      </div>
      <div className="border bg-black">
        <img src={jaguar} alt="picLogin" className="h-96" />
      </div>
    </div>
  );
}
