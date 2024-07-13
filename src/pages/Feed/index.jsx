import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

const Feed = () => {
  //kullanici state'i
  const [user, setUser] = useState(null);

  useEffect(() => {
    //anlik olarak kullanic oturumundaki degisimi izler
    const unSub = onAuthStateChanged(auth, (user_data) => {
      //state'i guncelle
      setUser(user_data);
    });
    //sayfadan ayrilma anini izler
    return () => unSub();
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
