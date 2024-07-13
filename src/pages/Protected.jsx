import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

//Outlet bileseni kapsayici route icerisinde bir alt route'u cagirmaya yariyor
const Protected = () => {
  //kullanicinin yetkisi var mi state'i
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //egerki kullanici varsa yetkisini true'ya cek
      // oturumu kapaliysa yetkisini false'a cek
      setIsAuth(user ? true : false);
    });
  }, []);

  //eger yetkisi yoksa
  if (isAuth === false) {
    return <Navigate to={"/"} />;
  }
  //yetkisi varsa alt route'daki sayfayi goster

  return <Outlet />;
};

export default Protected;
