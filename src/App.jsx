import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokemonId from "./pages/PokemonId";
import ProtectedAuth from "./components/auth/ProtectedAuth";

function App() {
  return (
    <section> 
      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<ProtectedAuth />} >
          <Route path="/pokedex" element={<Pokedex />} />

          <Route path="/pokedex/:id" element={<PokemonId />} />
        </Route>
        
      </Routes>
    </section>
  );
}

export default App;
