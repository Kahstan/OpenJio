import React, { useContext, useState } from "react";
import ReactContext from "../context/react-context";

const Form = () => {
  const reactCtx = useContext(ReactContext);

  const [justSubmitted, setJustSubmitted] = useState(false);

  const submitForm = async (url) => {
    const formdata = new FormData();
    formdata.append("name", reactCtx.nameInput);
    formdata.append("location", reactCtx.locationInput);
    formdata.append("date", reactCtx.dateInput);
    formdata.append("time", reactCtx.timeInput);
    formdata.append("tags", reactCtx.tagsInput);
    formdata.append("language", reactCtx.languageInput);
    

    const options = {
      method: "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        authorization: "Bearer " + reactCtx.access,
      },
      body: formdata,
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      window.alert("Listing created!");
      setJustSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(event) {
    event.preventDefault();
    if (event.target.id === "name") reactCtx.setNameInput(event.target.value);
    if (event.target.id === "location")
      reactCtx.setLocationInput(event.target.value);
    if (event.target.id === "date") reactCtx.setDateInput(event.target.value);
    if (event.target.id === "time")
      reactCtx.setTimeInput(event.target.value);
    if (event.target.id === "tags") reactCtx.setTagsInput(event.target.value);
    if (event.target.id === "language") reactCtx.setLanguageInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitForm("http://localhost:5001/listings/create");
  }

  function clearInputFields(event) {
    event.preventDefault();
    reactCtx.setNameInput("");
    reactCtx.setLocationInput("");
    reactCtx.setDateInput("");
    reactCtx.setTimeInput("");
    reactCtx.setTagsInput("");
    reactCtx.setLanguageInput("");
    setJustSubmitted(false);
  }

  return (
    <>
      {!reactCtx.loginState ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Log in to create an activity!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <h3 className=" text-2xl text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
              Create Activity!
            </h3>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <span className="col-start-1 col-end-4">
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Activity Name"
                  id="title"
                  value={reactCtx.nameInput}
                  className="mx-auto m-2 w-2/3 block w-100 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Location of activity"
                  id="petName"
                  value={reactCtx.locationInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Date of activity"
                  id="breed"
                  value={reactCtx.dateInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Time of activity"
                  id="sex"
                  value={reactCtx.timeInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Any tags?"
                  id="size"
                  value={reactCtx.tagsInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Language preferred"
                  id="age"
                  value={reactCtx.languageInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
            </span>
          </div>

          {
            <div>
              <button
                onClick={handleSubmit}
                className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2 text-white font-semibold button-85"
              >
                Create Activity!
              </button>
            </div>
          }

          {justSubmitted ? (
            <div>
              <button
                onClick={clearInputFields}
                className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2 text-white font-semibold button-85"
              >
                Clear form
              </button>
            </div>
          ) : (
            <></>
          )}
        </form>
      )}
    </>
  );
};

export default Form;
