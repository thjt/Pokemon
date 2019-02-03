import React from 'react';
import { CallAPI } from '../index.js';

class EvolutionChainOfSpecies extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      speciesId: props.match.params.speciesId,
      showDetails: false,
      details: {
        baseHappiness: null,
        captureRate: null,
        color: undefined,
        eggGroups: [],
        flavorText: undefined,
      }
    };
  }

  getSpeciesFromEvChain(evolutionChain){
    let species = [];
    let copyOfEvChain = evolutionChain;
    while (copyOfEvChain !== undefined) {
      species.push(copyOfEvChain.species);
      if(copyOfEvChain.evolves_to.length > 1)
        console.log("rekursiv");
      copyOfEvChain = copyOfEvChain.evolves_to[0];
    };
    //rekursiv loesen
    return species;
  }

  showSpeciesDetails(url) {
    const that = this;
    CallAPI(url,
            function(apireturn){
              that.setState({
                showDetails: true,
                details: {
                  baseHappiness: apireturn.base_happiness,
                  captureRate: apireturn.capture_rate,
                  color: apireturn.color.name,
                  flavorText: apireturn.flavor_text_entries[1].flavor_text,
                },
              });
            }
    )
    console.log('123');
  }

  componentDidMount () {
    const url = "https://pokeapi.co/api/v2/pokemon-species/" + this.state.speciesId;
    const that = this;
    CallAPI(url,
      function(apireturn) {
        CallAPI(apireturn.evolution_chain.url,
          function(evapireturn) {
            that.setState({
              items: that.getSpeciesFromEvChain(evapireturn.chain)
            });
          }
        )
      }
    );
  }

  render() {
    const { details, items } = this.state;
    return (
      <div className="listOfSpecies">
        <h3>Evolution Chain</h3>
        <ul>
          {items.map(item => (
            //<!--li key={item.name}</li> -->
              <button
                className="speciesName buttonShowDetails"
                onClick={() => this.showSpeciesDetails(item.url)}
                >
                  {item.name}
              </button>
          ))}
        </ul>
        <div className="speciesDetails" style = {this.state.showDetails ? {} : {display: 'none'}}>
          <p>Base Happiness: {details.baseHappiness} </p>
          <p>Capture Rate: {details.captureRate} </p>
          <p>Color: {details.color} </p>

          <p>{details.flavorText}</p>
        </div>
      </div>
    );
  }
}
/*
function callAPI (url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(
      (results) => {
        callback(results);
      },
      (error) => {
        callback(error);
      }
    );
}
*/
export default EvolutionChainOfSpecies;
