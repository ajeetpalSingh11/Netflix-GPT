import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser } from "../redux/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useRef gives the reference of the element in the form of an object with a current property,
  //which is an object with many properties, one of them is value, contains value of the referenced element
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleFormSubmit = () => {
    const message = checkValidData(email.current.value, password.current.value);
    if (message) {
      setErrorMessage(message);
      return;
    }

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const {uid, email, displayName, photoURL} = auth.currentUser
              dispatch(addUser({uid : uid, email : email, displayName: displayName, photoURL: photoURL}))
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("user signed in", user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handleToggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="background-img" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 bg-black absolute mt-24 mx-auto right-0 left-0 p-8 flex flex-col text-white rounded-lg"
      >
        <h2 className="font-bold text-2xl mb-2">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            className="py-3 px-4 mt-6 bg-gray-700 rounded-md"
            name="Full Name"
            placeholder="Full Name"
          />
        )}
        <input
          type="text"
          ref={email}
          className="py-3 px-4 mt-6 bg-gray-700 rounded-md"
          name="Email Address"
          placeholder="Email or Phone Number"
        />
        <input
          type="password"
          ref={password}
          className="py-3 px-4  mt-6  bg-gray-700 rounded-md"
          name="Password"
          placeholder="Password"
        />
        <p className="text-red-500 pt-3">{errorMessage}</p>
        <button
          className="w-full bg-red-700 rounded-md px-4 py-3 my-8 text-center"
          onClick={handleFormSubmit}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4">
          {isSignInForm ? "New to Netflix?" : "Already a User?"}{" "}
          <button
            className="text-gray-400 underline"
            onClick={handleToggleSignIn}
          >
            {isSignInForm ? "Sign Up Now" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
