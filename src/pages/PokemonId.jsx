import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();
  const backgroundByType = {
    grass: "from-green-300 to-green-100",
    fire: "from-red-300 to-red-100",
    water: "from-blue-300 to-blue-100",
    bug: "from-green-300 to-green-100",
    normal: "from-red-300 to-red-100",
    poison:"from-green-300 to-green-100",
    flying:"from-orange-500 to-black",
    fighting:"from-gray-500 to-black",
    electric:"from-yellow-500 to-yellow-100",
    steel :"from-green-300 to-green-100",
    dark :"from-black to-gray-100",
    psychic:"from-yellow-500 to-yellow-100",
    dragon :"from-yellow-500 to-yellow-100",
    ground:"from-yellow-300 to-yellow-200",
    ice :"from-blue-100 to-black",
    rock :"from-gray-300 to-gray-100 ",
    ghost :"from-purple-300 to-purple-300",
   
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (base_stat) => {
    const PercentStatBar = Math.round((base_stat * 200) / 255);
    return `${PercentStatBar}%`;
  };
  return (
    <section>
      <Header />
      <section className="px-2 py-14 ">
        <article className="max-w-[800px] mx-auto shadow-xl shadow-gray-400 p-2">
          {/* Seccion superior */}
          <section className={` bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px] `}>
            <div className="absolute w-[200px] mx-auto left-1/2 -translate-x-1/2 -top-14">
              <img className="hover:animate-bounce"
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>
          {/*Informacion general*/}
          <section >
            <div>
              <h3 className=" text-center text-2xl">#{pokemon?.id}</h3>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2 className="capitalize font-bold text-center text-2xl underline-offset-8">{pokemon?.name}</h2>
              <hr />
            </div>
            <div className="flex justify-center text-center font-extrabold text-xl gap-6 ">
              <div >
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>
              <div >
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>
            <section className="grid md:first-line:grid-cols-2 text-center gap-4">
              {/*tipos*/}
              <section className="text-center">
                <h3 className="font-extrabold text-xl shadow-md  shadow-slate-900  mx-4">Types</h3>
                <section className="grid grid-cols-2 gap-4 mt-4">
                  {pokemon?.types.map((type) => (<article className="p-2 px-8 border-[1px] border-gray-300 capitalize shadow-md  shadow-slate-900  mx-4 "key={type.type.name}>{type.type.name}</article>))
                  }
                </section>
              </section>
              <section className="text-center grid grid-rows-1 right-10 items-center ">
                <h3 className=" shadow-md  shadow-slate-900 w-auto mx-24 font-extrabold text-xl ">Abilities</h3>
                <section className="grid grid-cols-1 gap-4 mt-4 ">
                  {pokemon?.abilities.map((ability) => (
                    <article className=" shadow-md  shadow-slate-900  mx-6 p-2 px-8 mb-2 border-[1px] border-gray-400 capitalize "key={ability.ability.name}> {ability.ability.name}</article>))
                  }
                </section>
              </section>
            </section>
          </section>
          <section>
            <h2 className="font-extrabold text-xl">Stats</h2>
            <section className="capitalize">
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between">
                    <h5 className="Capitalize">{stat.stat.name}</h5>
                    <span>{stat.base_stat}/150</span>
                  </section>
                  <div className="bg-gray-100 h-6 roundes-md">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className={`h-full bg-gradient-to-r bg-yellow-300 to-yellow-500 hover:animate-bounce`}
                    >%</div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
