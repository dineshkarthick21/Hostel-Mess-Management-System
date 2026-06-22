import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";

export default function SignIn() {
  let navigate = useNavigate();

  if (localStorage.getItem("student") || localStorage.getItem("admin")) {
    verifysession();
  }

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: email,
      password: pass,
    };

    let response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    let result = await response.json();

    if (result.success) {
      let student = await fetch("http://localhost:3000/api/student/get-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          isAdmin: result.data.user.isAdmin
        })
      });

      let studentResult = await student.json();
      if (studentResult.success) {
        localStorage.setItem("student", JSON.stringify(studentResult.student));
        navigate("/student-dashboard");
      } else {
        // console.log(studentResult.errors)
      }
    } else {
      // alert(result.errors[0].msg);
      toast.error(
        result.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setLoader(false);
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false)

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const iemail = {
    name: "email",
    type: "email",
    placeholder: "abc@gmail.com",
    req: true,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-slate-800 border-emerald-600 border-2">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-emerald-400">
          Sign in to your account - Student
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={iemail} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3 bg-slate-700 border-emerald-500 focus:ring-emerald-500 ring-offset-slate-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-emerald-100">
                  Remember me
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-800"
          >
            {loader ? (
              <>
                <Loader /> Verifying...
              </>
            ) : (
              <span>Sign in</span>
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
          <p className="text-sm font-light text-slate-300">
            Don't have an account yet?{" "}
            <Link
              to="/auth/signup"
              className="font-medium hover:underline text-emerald-400"
            >
              Sign up here.
            </Link>
          </p>
          <p className="text-sm font-light text-slate-300">
            Are you a manager?{" "}
            <Link
              to="/auth/admin-signup"
              className="font-medium hover:underline text-emerald-400"
            >
              Admin sign up.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
