import React from "react";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNameTrainer(e.target.nameTrainer.value)) 
    navigate('/pokedex')
  };
  return (
    <section className="min-h-screen grid grid-rows-[1fr_auto]">
      {/* Parte superior*/}
      <section className="relative">
        <article className="absolute top-1/2 -translate-y-1/2 bottom-0 right-0
         left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center">
          <div>
            <img className="" src="/images/pokedex-logo.png" alt="" />
          </div>
          <h2 className="text-red-600 text-[1.2rem] font-bold">¡Hola Entrenador!</h2>
          <p>Para poder comenzar, dame tu nombre:</p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex items-center justify-center">
              <input className="border-2 border-red-600 rounded-sm w-full max-w-[300px] py-2 " id="nameTrainer" type="text" placeholder="Tu nombre..." />
              <button className="border-2 border-black bg-black text-white rounded-sm w-[45%] max-w-[119px] py-2">Comenzar</button>
            </div>
          </form>
        </article>
      </section>
       {/* Footer*/}
      <Footer />
    </section>
  );
};

export default Home;
