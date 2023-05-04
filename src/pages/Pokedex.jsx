import React, { useEffect, useRef, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";
import { current } from "@reduxjs/toolkit";

const Pokedex = () => {
  //?Array de poquemons antes de filtrar
  const [pokemons, setPokemons] = useState([]);
  //? String para filtrar los pokemons posibles
  const [pokemonName, setPokemonName] = useState("");
  //?Arreglo de tipos de pokemons posibles
  const [types, setTypes] = useState([]);
  //? Filtro  de tipo, me almacena el tupo actual
  const [currentType, setCurrentType] = useState();
  //?Pagina actual
  const [currentPage, setCurentPage] = useState(1);
  //?Estado global donde se almacena el nombre del ususrio
  const input = useRef(null);
  const nameTrainer = useSelector((store) => store.nameTrainer);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };
  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );
  const paginationLogic = () => {
    //Cantidad de pokemons por pagina
    const POKEMONS_PER_PAGE = 20;
    //Pokemons que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);
    //Ultima pagona
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;
    //Bloque actual
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);
    //Paginas a mostrar en el bloque actual
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pokemonInPage, lastPage, pagesInBlock };
  };
  const { pokemonInPage, lastPage, pagesInBlock } = paginationLogic();
  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurentPage(newCurrentPage);
    }
  };
  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurentPage(newCurrentPage);
    }
  };
  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);
  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => {
        setTypes(res.data.results.map((type) => type.name));
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;
      axios
        .get(URL)
        .then((res) => {
          const pokemonByType = res.data.pokemon.map(
            (pokemo) => pokemo.pokemon
          );
          setPokemons(pokemonByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);
  useEffect(() => {
    setCurentPage(1);
  }, [pokemonName, currentType]);
  useEffect(() => {
    setPokemonName("");
    input.current.value = "";
  }, [currentType]);
  return (
    <section className="min-h-screen ">
      <Header />
      <section className="py-6 px-2 flex flex-row flex-wrap justify-center ">
        <h3 className="flex gap-2 ">
          <p className="text-red-500 flex">Welcome </p> {nameTrainer}, here you
          can find your favorite pokemon
        </h3>
        <form onSubmit={handleSubmit} className=" flex gap-1">
          <div className="shadow-md shadow-gray-400 flex ">
            <input
              ref={input}
              id="pokemonName"
              type="text"
              placeholder=" Search your pokemon "
            />
            <button className="bg-[#D93F3F] text-white px-4 ">Search</button>
          </div>
          <select onChange={(e) => setCurrentType(e.target.value)}>
            <option value="">All</option>
            {types?.map((type) => (
              <option className=" capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>
      {/* Paginacion*/}
      <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
        <li
          onClick={() => setCurentPage(1)}
          className="p-3 rounded-md border-red-400 border-2 cursor-pointer font-extrabold"
        >
          {"<<"}
        </li>
        <li
          onClick={handleClickPreviusPage}
          className="p-3 rounded-md border-red-400 border-2 cursor-pointer font-extrabold"
        >
          {"<"}
        </li>
        {pagesInBlock.map((numberpage) => (
          <li
            onClick={() => setCurentPage(numberpage)}
            className={`p-3 rounded-md border-red-400 border-2 cursor-pointer font-bold ${
              numberpage === currentPage && "bg-red-500"
            }`}
            key={numberpage}
          >
            {numberpage}
          </li>
        ))}
        <li
          onClick={handleClickNextPage}
          className="p-3 rounded-md border-red-400 border-2 cursor-pointer font-extrabold"
        >
          {">"}
        </li>
        <li
          onClick={() => setCurentPage(lastPage)}
          className="p-3 rounded-md border-red-400 border-2 cursor-pointer font-extrabold"
        >
          {">>"}
        </li>
      </ul>

      <section className="grid  gap-6 px-2 grid-cols-[repeat(auto-fill,_290px)] auto-rows-auto  justify-center">
        {pokemonInPage?.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUlr={pokemon.url} />
        ))}
      </section>
    </section>
  );
};

export default Pokedex;
