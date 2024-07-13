import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "./../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Loader from "../Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  //tweet koleksiyonunun referansi
  const tweetsCol = collection(db, "tweets");

  //medyayi storage yukler ve url'ini dondurur
  const uploadImage = async (file) => {
    //1. dosya resim degilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) return null;

    //2. dosyanin yuklenecegi konumun referansini al
    const imageRef = ref(storage, v4() + file.name);
    try {
      //3. referansini olusturdugumuz koduma dosyayi yukle
      await uploadBytes(imageRef, file);

      //4. storage'a yuklenen dosyanin url'ini al ve return et
      return await getDownloadURL(imageRef);
    } catch (err) {
      toast.error("resmi yuklersen bir sorun olustu");
      return null;
    }
  };

  //form gonderilince
  const handleSubmit = async (e) => {
    e.preventDefault();

    //1. inputlardaki verilere eris
    const text = e.target[0].value.trim();
    const file = e.target[1].files[0];

    //2. yazi ve resim icerigi yoksa uyari ver
    if (text && !file)
      return toast.info("Lutfen icerik giriniz", { position: "bottom-right" });
    if (!user) {
      return toast.error("kullanici bilgileri eksik");
    }

    //yuklenmenin basladigini belirt
    setIsLoading(true);
    try {
      // 3. resim varsa resmi storage yukle
      const url = await uploadImage(file);

      //4. yeni tweet dokumanini koleksiyona ekle
      await addDoc(tweetsCol, {
        textContent: text,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEditted: false,
        user: {
          id: user.uid || "unknown_user_id",
          name: user.displayName || "Anonymous",
          photo: user.photoURL || "",
        },
      });
      toast.success("Tweet basariyla gonderildi");
    } catch (err) {
      toast.error("Tweet'i gonderirken bir hata olustu");
    }
    //yuklenmenin bittigini belirt
    setIsLoading(false);

    //Formu sifirla
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="h-[35px] rounded-full md:h-[45px] mt-1"
        src={user?.photoURL}
      />

      <div className="w-full">
        <input
          className="w-full mt-1 mb-2 bg-transparent outline-none md:text-lg"
          placeholder="Neler Oluyor?..."
          type="text"
        />

        <div className="flex justify-between items-center">
          <label
            className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="icon"
          >
            <FaRegImage />
            <input className="hidden" id="icon" type="file" />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <Loader /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Form);
