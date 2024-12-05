// import {
//   GoogleAuthProvider,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import app from "../firebase/firebase.config";

export const AuthContext = createContext();
// const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, SetUser] = useState(null);

  // const googleProvider = new GoogleAuthProvider();

  const signIn = (email, password) => {
    return axios.post(` http://localhost:3000/auth/login`, {
      email,
      password,
    });
  };
  const register = async (name, email, password) => {
    return axios.post(` http://localhost:3000/auth/register`, {
      name,
      email,
      password,
    });
  };

  const logOut = () => {
    SetUser(null);
    localStorage.remove("user");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const auth = JSON.parse(localStorage.getItem("user"));
      SetUser(auth);
    }
  }, []);

  const authinfo = {
    user,
    // createUser,
    signIn,
    register,
    logOut,
    SetUser,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
