import React from 'react';
import { Link } from 'react-router-dom';
import { CallAPI } from '../index.js';

class PokemonSpecies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      speciesId: null,
    };
  }

  getSpeciesIdFromUrl(url) {
    let arr = url.split('/');
    let id = arr[arr.length-2]; //length - 1 returns empty string
    return id.toString();
  }

  componentDidMount() {
    const that = this;
    CallAPI("https://pokeapi.co/api/v2/pokemon-species",
      (apiresult) =>
          that.setState({
              error: apiresult.error,
              isLoaded: true,
              items: apiresult.results
          })
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading... O__O </div>;
    } else {
      return (
        <div className="listOfSpecies">
          <h2>Pokemon Species</h2>
          <ul>
            {items.map(item => (
              <li key={item.name}>
                <div className="speciesName" >{item.name}</div>

                <button className="buttonShowEvChain">
                  <Link to={`/chainOfSpecies/${this.getSpeciesIdFromUrl(item.url)}`}
                        style={{ textDecoration: 'none' }}
                        className="link">
                    Show Evolution Chain
                  </Link>
                </button>

              </li>
            ))}
          </ul>
        </div>
      );
    }
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
export default PokemonSpecies;
