import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    //abone olunacak koleksiyonun referansini alma
    const tweetsCol = collection(db, "tweets");

    //sorgu ayarlari belirleme
    const q = query(tweetsCol, orderBy("createdAt", "desc"));

    //koleksiyondaki verilere abone ol
    const unSub = onSnapshot(q, (snapshot) => {
      const temp = [];

      //belgelerin icerisindeki verilere erisip bir diziye aktardik
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));

      //state'e aktar
      setTweets(temp);
    });

    //kullanici sayfadan ayrilirsa aboneligi sonlandir
    return () => unSub();
  }, []);

  return (
    <div className="border-zinc-600 border overflow-y-auto">
      <header className="font-bold p-4 border-b border-zinc-600">
        Anasayfa{" "}
      </header>

      <Form user={user} />

      {!tweets ? ( // tweets null ise Loader göster
        <Loader />
      ) : tweets.length === 0 ? ( // tweets boşsa, uygun bir mesaj göster
        <p>Gösterilecek tweet yok</p>
      ) : (
        // tweets bir dizi ise, tweet'leri map ile render et
        tweets.map((tweet, i) => <Post key={i} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
