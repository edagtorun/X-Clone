import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

const EditMode = ({ tweet, close }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  //form gonderilince
  const handleSubmit = async (e) => {
    e.preventDefault();

    //yeni basliga eris
    const newTitle = e.target[0].value;

    //guncellenecek tweetin referansini al
    const tweetRef = doc(db, "tweets", tweet.id);

    //belgeyi guncelle
    if (isPicDeleting) {
      await updateDoc(tweetRef, {
        textContent: newTitle,
        imageContent: null,
        isEdited: true,
      });
    } else {
      updateDoc(tweetRef, {
        textContent: newTitle,
        isEdited: true,
      });
    }
    //duzenleme modunu kapat
    close();
  };
  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        defaultValue={tweet.textContent}
        className="rounded p-1 px-2 text-black"
        type="text"
      />
      <button
        type="submit"
        className="mx-5 p-2 border border-zinc-500 text-green-400 rounded-lg shadow hover:bg-zinc-700"
      >
        <FaSave />
      </button>

      <button
        type="button"
        onClick={close}
        className="mx-5 p-2 border border-zinc-500 text-red-400 rounded-lg shadow hover:bg-zinc-700"
      >
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={`${isPicDeleting ? "blur" : ""}
                my-2 rounded-lg  w-full object-cover max-h[400px]`}
            src={tweet.imageContent}
          />
          <button
            type="button"
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-0 right-0 text-xl  p-2 bg-white  transition text-red-600 hover:scale-90 rounded-full"
          >
            {isPicDeleting ? <BsArrowReturnLeft /> : <FaTrashAlt />}
          </button>
        </div>
      )}
    </form>
  );
};

export default EditMode;
