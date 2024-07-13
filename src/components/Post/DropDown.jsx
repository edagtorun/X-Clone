import React, { useRef } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const DropDown = ({ handleDelete, handleEdit }) => {
  const inputRef = useRef();
  return (
    <>
      <label className="popup">
        <input ref={inputRef} type="checkbox" />
        <div className="burger" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Aksiyonlar</legend>
          <ul>
            <li>
              <button
                onClick={() => {
                  //dropdownu kapat
                  inputRef.current.checked = false;
                  //duzenleme modunu acar
                  handleEdit();
                }}
              >
                <MdOutlineEdit />
                <span>Duzenle</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <FaTrashAlt />
                <span>Sil</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </>
  );
};
export default DropDown;
