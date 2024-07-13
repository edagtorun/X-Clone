import { FaHome } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";

export const navSections = [
  {
    title: "Anasayfa",
    icon: <FaHome />,
  },
  {
    title: "Bildirimler",
    icon: <IoMdNotificationsOutline />,
  },
  {
    title: "Mesajlar",
    icon: <IoMailOutline />,
  },
  {
    title: "Listeler",
    icon: <CiViewList />,
  },
  {
    title: "Yer Isaretleri",
    icon: <CiBookmark />,
  },
  {
    title: "Onaylanmis",
    icon: <CiCircleCheck />,
  },
  {
    title: "Profil",
    icon: <CgProfile />,
  },
  {
    title: "Daha Fazla",
    icon: <CiCircleMore />,
  },
];
