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
  const [userRole, setUserRole] = useState("guest");

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

      if (data.length > 1) {
        setUserRole("admin");
        console.log(userRole);
      }

      if (data.length == 1) {
        setUserRole("user");
        console.log(userRole);
      }
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  const updateListingFavouriteCount = async (url, listingId) => {
    const bod = JSON.stringify({ id: listingId });

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfileFavouritesArray = async (url, listingId) => {
    const bod = JSON.stringify({ favouriteAdd: listingId });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
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
      console.log(data);
      // window.alert("Listing favourited!");
    } catch (err) {
      console.log(err);
    }
  };

  function addToFavourites(event) {
    event.preventDefault();
    console.log(event.target.id);

    // go to listing and plus one to favourite count
    updateListingFavouriteCount(
      "http://localhost:5001/listings/favourite",
      event.target.id
    );

    // go to profile and add listing ID to profile favourites array
    updateProfileFavouritesArray(
      "http://localhost:5001/users/favourites",
      event.target.id
    );

    refreshState ? setRefreshState(false) : setRefreshState(true);
  }

  const updateListingArchive = async (url, listingId, boolean) => {
    const bod = JSON.stringify({ id: listingId, isArchive: boolean });

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
      },
      body: bod,
    };

    try {
      const res = await fetch(url, options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      console.log("Added to archives!");
    } catch (err) {
      console.log(err);
    }
  };

  function addToArchives(event) {
    event.preventDefault();

    updateListingArchive(
      "http://localhost:5001/listings/archive",
      event.target.id,
      true
    );

    refreshState ? setRefreshState(false) : setRefreshState(true);
  }

  function removeFromArchive(event) {
    event.preventDefault();

    updateListingArchive(
      "http://localhost:5001/listings/archive",
      event.target.id,
      false
    );

    refreshState ? setRefreshState(false) : setRefreshState(true);
  }

  return (
    <ReactContext.Provider
      // these are not mandatory, the "parent" can choose what data the "child" can access
      value={{
        userRole,
        setUserRole,
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
        addToFavourites,
        addToArchives,
        refreshState,
        setRefreshState,
        fetchDisplay,
        removeFromArchive,
      }}
    >
      <div className="container">
        <NavBar />
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
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
