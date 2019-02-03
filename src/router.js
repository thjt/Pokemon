import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';


import PokemonSpecies from './components/pokemon-species';
import EvolutionChainOfSpecies from './components/evolution-chain.js';


export default (
  <Router>
    <div>
      <Route path="/" exact component={PokemonSpecies} />
      <Route path="/chainOfSpecies/:speciesId" component={EvolutionChainOfSpecies} />
    </div>
  </Router>
);
