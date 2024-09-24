import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import "./assets/font/stylesheet.css";

import Alert from "./components/Alert";
import AuthRoutes from "./routing/AuthRoutes";
import PrivateRoutes from "./routing/PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";

function App() {
  let tokenState = localStorage.getItem('dizeeToken');
  let bool = false
  if (tokenState) {
    bool = true
  }
  const [currentUser, setCurrentUser] = useState(bool);

  const auth = useSelector((state) => state.auth?.isLogin);
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('dizeeToken');
    const isLoggedIn = token;
    setCurrentUser(isLoggedIn);

    // const checkTokenExpiration = () => {
    //   if (token) {
    //     const decodedToken = jwtDecode(token);
    //     const currentTime = Math.floor(Date.now() / 1000);

    //     if (decodedToken.exp <= currentTime) {
    //       // dispatch(logout_thunk());
    //     }
    //   }
    // };

    // checkTokenExpiration();
  }, [dispatch, auth, currentUser]);
  return (
    <>
      <Alert />

      <BrowserRouter>
        <Routes>
          {
            !currentUser ?
              <>
                <Route path='/*' element={<AuthRoutes />} />
                <Route path='*' element={<Navigate to='/' />} />
              </>
              :
              <>
                <Route path='/*' element={<PrivateRoutes />} />
                <Route path='*' element={<Navigate to='/' />} />
              </>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
