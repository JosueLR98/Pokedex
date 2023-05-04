import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";

const Header = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(setNameTrainer(""));
  };
  return (
    <section className="relative">
      <div className="h-20 bg-red-600 grid items-end"></div>
      <div className="max-w-[200px]">
        <img src="/images/pokedex-logo.png" alt="" />
      </div>
      <div className="h-12 bg-black"></div>
      <div className=" absolute  h-20 aspect-square bg-white border-[8px] border-black rounded-full -bottom-4 right-4 -translate-x-1/2 after:content[''] after:h-14 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 ">
        <i onClick={handleClickLogout} className="bx bx-log-out-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-30 text-2xl hover:text-red-500 cursor-pointer"></i>
      </div>
    </section>
  );
};

export default Header;
