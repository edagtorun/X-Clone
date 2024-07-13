import React, { useState } from "react";
import UserInfo from "./UserInfo";
import Content from "./Content";
import Buttons from "./Buttons";
import { auth, db } from "./../../firebase/config";
import DropDown from "./DropDown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // silme butonuna tiklaninca
  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    deleteDoc(tweetRef)
      .then(() => toast.warn("Tweet akistan kaldirildi"))
      .catch((err) => toast.error("Tweet silinirken bir sorun olustu"));
  };

  //duzenle butonuna tiklaninca
  const handleEdit = () => {
    setIsEditMode(true);
  };
  //oturumu acik olan kullanici bu tweeti like'ladimi?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  //like butonuna tiklaninca
  const toggleLike = async () => {
    //guncellenecek belgenin referansini al
    const tweetRef = doc(db, "tweets", tweet.id);
    //kullanici tweeti like atmissa
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) // diziden kaldir
        : arrayUnion(auth.currentUser.uid), //degilse diziye ekle
    });
  };

  return (
    <div className="flex gap-3 border-b py-6 px-3 border-zinc-600">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <UserInfo tweet={tweet} />
          {auth.currentUser.uid === tweet.user.id && (
            <DropDown handleDelete={handleDelete} handleEdit={handleEdit} />
          )}
        </div>
        {isEditMode ? (
          <EditMode close={() => setIsEditMode(false)} tweet={tweet} />
        ) : (
          <Content tweet={tweet} />
        )}

        <Buttons
          isLiked={isLiked}
          toggleLike={toggleLike}
          likeCount={tweet.likes.length}
        />
      </div>
    </div>
  );
};

export default Post;
