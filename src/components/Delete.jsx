import React from "react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export function Delete(props) {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);

  const deleteAc = async (e) => {
    e.preventDefault;
    try {
      const { data } = await axios.delete(backendUrl + "/api/auth/delete");
      if (data.success) {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        setUserData(false)
        navigate("/", { replace: true });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      to;
    }
    ast.error(data.message);
  };

  return (
    <>
      <Navbar />
      <div className="text-center  text-white mt-20">
        <div className=" duration-500 ease-in w-120 p-20 gap-10 border-gray-100 border-1 rounded-2xl flex flex-col justify-center items-center ">
          <h2 className="text-white text-3xl">Conform Delete Acocunt</h2>
          <div className="flex justify-between">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn2"
            >
              Cancle
            </button>
            <button onClick={deleteAc} className="btn3">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
