import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

/*

class PokemonSpecies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      evChainDisplayed: false
    };
  }

  handleClick (url) {
    debugger;
    console.log('handleccc');
    //const url = this.state.species.url;
    const that = this;
    callAPI(url,
      function(apireturn) {
        callAPI(apireturn.evolution_chain.url,
                function(evapireturn) {
                  that.setState({
                    items: that.getSpeciesFromEvChain(evapireturn.chain),
                    evChainDisplayed: true
                  });

                  //console.log(evapireturn.chain);
                }
        )
      }
    );
  }

  getSpeciesFromEvChain(evolutionChain){
    let species = [];
    let copyOfEvChain = evolutionChain;
    while (copyOfEvChain !== undefined) {
      debugger;
      species.push(copyOfEvChain.species)
      copyOfEvChain = copyOfEvChain.evolves_to[0];
    };
    return species;
  }

  componentDidMount() {
    const that = this;
    callAPI("https://pokeapi.co/api/v2/pokemon-species",
            (apiresult) =>
                that.setState({
                    error: apiresult.error,
                    isLoaded: true,
                    items: apiresult.results
                })
            );
  }

  render() {
    return (
      <ul className="user-list">
        <li>Michael</li>
      </ul>
    );
    /*
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name}
                <button
                  className="showEvChain"
                  onClick={() => this.handleClick(item.url)}
                  display={!this.state.evChainDisplayed}>
                  Show Evolution Chain
                </button>
            </li>
          ))}
        </ul>
      );
    }
    }
}

*/

export function CallAPI (url, callback) {
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
// ========================================


ReactDOM.render(
  Router,
  document.getElementById('root')
);
