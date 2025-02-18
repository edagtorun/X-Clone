import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  //form gonderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // kaydol modundaysa: hesap olustur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabiniz Olusturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error("Bir sorun olustu:" + err.code));
    } else {
      //giris modundaysa: hesaba giris yap
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesaba giris yapildi");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("Bir sorun olustu:" + err.code);
          if (err.code === "auth/invalid-credential") setIsError(true);
        });
    }
  };

  //sifre sifirlama e postasi gonder

  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() =>
        toast.info(
          "Sifre sifirlama e-postasi gonderildi. Mailinizi kontrol edin."
        )
      )
      .catch((err) => toast.error("Bir sorun olustu:" + err.code));
  };

  //Google ile giris yap
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Hesabiniza Giris Yapildi");
        navigate("/home");
      })
      .catch((err) => toast.error("Bir sorun olustu:" + err.code));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" />
        </div>
        <h1 className="text-lg font-bold text-center"> Twitter'a giris yap</h1>

        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap"
        >
          <img className="h-[20px] " src="/google-logo.svg" />
          Google ile Giris Yap
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
          />

          <label className="mt-5">Sifre</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
          />

          <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? " Kaydol" : "Giris Yap"}
          </button>

          <p onClick={() => setIsSignUp(!isSignUp)} className="mt-5">
            <span className="text-gray-500">
              {isSignUp ? "Hesabiniz varsa" : "Hesabiniz yoksa"}
            </span>
            <span className="ms-2 text-blue-500 cursor-pointer">
              {isSignUp ? "Giris Yapin" : "Kaydolun "}
            </span>
          </p>
        </form>

        {isError && (
          <p
            onClick={handleReset}
            className="text-red-500 text-center cursor-pointer"
          >
            {" "}
            Sifrenizi mi unuttunuz?{" "}
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
