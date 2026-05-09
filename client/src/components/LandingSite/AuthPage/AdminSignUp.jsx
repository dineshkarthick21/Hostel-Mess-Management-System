import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "./Input";
import { Loader } from "../../Dashboards/Common/Loader";

export default function AdminSignUp() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const signUp = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/signup-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Admin account created. Please sign in.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/auth/admin-login");
      } else {
        const message = result?.errors?.[0]?.msg || "Signup failed";
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setLoader(false);
  };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Full name",
      req: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "abc@email.com",
      req: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "••••••••",
      req: true,
    },
  ];

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-xl xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Create admin account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={signUp}>
          {fields.map((field) => (
            <Input
              key={field.name}
              field={{
                ...field,
                value: form[field.name],
                onChange: handleChange,
              }}
            />
          ))}
          <button
            type="submit"
            className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 focus:ring-blue-800"
          >
            {loader ? (
              <>
                <Loader /> Creating...
              </>
            ) : (
              <span>Sign up</span>
            )}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <p className="text-sm font-light text-gray-400">
            Already have an account?{" "}
            <Link to="/auth/admin-login" className="font-medium hover:underline text-blue-500">
              Sign in
            </Link>
          </p>
          <p className="text-sm font-light text-gray-400">
            Are you a student?{" "}
            <Link to="/auth/signup" className="font-medium hover:underline text-blue-500">
              Student sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
