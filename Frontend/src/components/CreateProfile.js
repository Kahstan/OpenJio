import React, { useContext } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const CreateProfile = () => {
  const reactCtx = useContext(ReactContext);

  const fetchReg = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.emailInput,
      password: reactCtx.passwordInput,
      password1: reactCtx.passwordInput,
      caregiverName: reactCtx.caregiverNameInput,
      caregiverInterest: reactCtx.caregiverInterest,
      elderlyLang: reactCtx.elderlyLang,
      elderlyInterest: reactCtx.elderlyInterest,
      elderlyAge: reactCtx.elderlyAge,
    });

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
      body: bod,
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      // setData(data);
      console.log(data); // this returns both access and refresh tokens as part of the data object

      reactCtx.setEmailInput(data.email);
      reactCtx.setPasswordInput(data.password);
      reactCtx.setCaregiverNameInput(data.caregiverName);
      reactCtx.setCaregiverInterest(data.caregiverInterest);
      reactCtx.setElderlyLang(data.elderlyLang);
      reactCtx.setElderlyAge(data.elderlyAge);
      reactCtx.setElderlyInterest(data.elderlyInterest);

      alert("profile created");
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    // console.log(event.target.id);
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    if (event.target.id === "password")
      reactCtx.setPasswordInput(event.target.value);
    // if (event.target.id === "password1")
    //   reactCtx.setConfirmPassword(event.target.value);
    if (event.target.id === "caregiverName")
      reactCtx.setCaregiverName(event.target.value);
    if (event.target.id === "caregiverInterest")
      reactCtx.setCaregiverInterest(event.target.value);
    if (event.target.id === "elderlyLang")
      reactCtx.setElderlyLang(event.target.value);
    if (event.target.id === "elderlyInterest")
      reactCtx.setElderlyInterest(event.target.value);
    if (event.target.id === "elderlyAge")
      reactCtx.setElderlyAge(event.target.value);
  }

  function handleRegister(event) {
    event.preventDefault();
    fetchReg("http://localhost:5001/users/register");
  }

  return (
    <>
      <h1>Registration Page</h1>
      <form>
        <div className="justify-center">
          <input
            type="email"
            placeholder="Required: Your Email Address"
            onChange={handleInput}
            id="email"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Required: Alphanumeric Password"
            onChange={handleInput}
            id="password"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Required: Your Name"
            onChange={handleInput}
            id="caregiverName"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Required: Your Interest"
            onChange={handleInput}
            id="caregiverInterest"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Required: Elderly's language"
            onChange={handleInput}
            id="elderlyLang"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Required: Elderly's interest"
            onChange={handleInput}
            id="elderlyInterest"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Required: Elderly's Age"
            onChange={handleInput}
            id="elderlyAge"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <button
            onClick={handleRegister}
            className="mx-auto block w-50 px-3 py-2 text-white font-semibold button-85"
          >
            <Link to="/login">Register</Link>
          </button>
        </div>
      </form>
      <div></div>
    </>
  );
};

export default CreateProfile;
