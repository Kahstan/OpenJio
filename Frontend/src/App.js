import React, { Suspense, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ReactContext from "./context/react-context";

import Profile from "./pages/Profile";

const Home = React.lazy(() => import("./pages/Home"));
// const Favourite = React.lazy(() => import("./pages/Favourite"));
const Login = React.lazy(() => import("./pages/Login"));
const Form = React.lazy(() => import("./pages/Form"));
const CreateProfile = React.lazy(() => import("./components/CreateProfile"));
// const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  //registration
  const [nameInput, setNameInput] = useState("");
  const [profileTypeInput, setProfileTypeInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  //search bar
  const [searchListingInput, setSearchListingInput] = useState("");

  // login details
  const [userProfile, setUserProfile] = useState("");

  const [loginState, setLoginState] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  const [caregiverName, setCaregiverName] = useState("");
  const [caregiverInterest, setCaregiverInterest] = useState("");
  const [elderlyLang, setElderlyLang] = useState("");
  const [elderlyInterest, setElderlyInterest] = useState("");
  const [elderlyAge, setElderlyAge] = useState("");

  // refresh pages
  const [refreshState, setRefreshState] = useState(false);

  //password1 for the sign up page
  //profile
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [displayAll, setDisplayAll] = useState("");
  const [searchUserInput, setSearchUserInput] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const fetchDisplay = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
      },
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
      console.log(data);
      setUserProfile(data);
      console.log(userProfile);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  return (
    <ReactContext.Provider
      // these are not mandatory, the "parent" can choose what data the "child" can access
      value={{
        loginState,
        setLoginState,
        loginEmail,
        setLoginEmail,
        userProfile,
        setUserProfile,
        searchListingInput,
        setSearchListingInput,
        phoneInput,
        setPhoneInput,
        addressInput,
        setAddressInput,
        profileTypeInput,
        setProfileTypeInput,
        nameInput,
        setNameInput,
        access,
        setAccess,
        refresh,
        setRefresh,
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        displayAll,
        setDisplayAll,
        searchUserInput,
        setSearchUserInput,
        validEmail,
        setValidEmail,
        refreshState,
        setRefreshState,
        fetchDisplay,
        caregiverName,
        setCaregiverName,
        caregiverInterest,
        setCaregiverInterest,
        elderlyLang,
        setElderlyLang,
        elderlyInterest,
        setElderlyInterest,
        elderlyAge,
        setElderlyAge,
      }}
    >
      <div className="container">
        <NavBar />
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"></Redirect>
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/Form">
              <Form />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register">
              <CreateProfile />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </ReactContext.Provider>
  );
}

export default App;
