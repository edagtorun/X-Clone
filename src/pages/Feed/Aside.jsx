import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Aside = () => {
  const [count, setCount] = useState();
  useEffect(() => {
    const tweetsCol = collection(db, "tweets");

    onSnapshot(tweetsCol, (snapshot) => {
      setCount(snapshot.size);
    });
  }, []);
  return (
    <div className="max-xl:hidden">
      <h1 className="text-xl font-semibold p-4">Gonderi Sayisi: {count}</h1>
    </div>
  );
};
// feed/index dosyasindaki user state'inin degismesi bu bilesenin render olmasina sebep oluyordu bu bilesende user'i kullanmayacagimizdan dolayi gereksiz yere tekrar render olmasini istemiyorduk. Bu sorunu cozmek icin bilesenin aldigi proplar degismedikce render olmasini engelleyen React.memo methodunu kullandik.
export default React.memo(Aside);
