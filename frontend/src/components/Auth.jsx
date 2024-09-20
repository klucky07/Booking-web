import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export const Auth = ({ type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postinputs, setPostinputs] = useState({
    name: "",
    email: "",
    password: ""
  });

 

  async function SendRequest() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postinputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      setLoading(false);
      navigate("/blogs");
    } catch (e) {
      alert("error");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="font-semibold text-3xl px-5">Create an Account</div>
          <div className="text-slate-400 px-6 font-semibold">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link to={type === "signin" ? "/signup" : "/signin"} className="underline pl-2">
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
          <div className="pt-4">
            <div className="pt-2">
              {type === "signup" ? (
                <LabeledInput
                 
                  placeholder="Enter Username"
                  onChange={(e) => {
                    setPostinputs((c) => ({
                      ...c,
                      name: e.target.value
                    }));
                  }}
                />
              ) : null}
            </div>
            <div className="pt-2">
              <LabeledInput
              
                placeholder="Enter email"
                onChange={(e) => {
                  setPostinputs((c) => ({
                    ...c,
                    email: e.target.value
                  }));
                }}
              />
            </div>
            <div className="pt-2">
              <LabeledInput
             
                type={"password"}
                placeholder="Enter Password"
                onChange={(e) => {
                  setPostinputs((c) => ({
                    ...c,
                    password: e.target.value
                  }));
                }}
              />
            </div>
            <div className="pt-5">
              <button
                onClick={SendRequest}
                type="button"
                className="text-white w-full bg-red-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-gray-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                {type === "signup" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LabeledInput({ label, placeholder, onChange, type }) {
  return (
    <div>
      <label className="block mb-2 pl-1 text-sm font-bold text-gray-900 dark:text-black">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        className="bg-gray-100 border border-gray-300 text-black text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
