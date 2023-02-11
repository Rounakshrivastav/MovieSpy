import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg"
import { MovieCard } from "./MovieCard";

//eace8bf6

const API_URL = "http://www.omdbapi.com?apikey=69cfe301";

// eslint-disable-next-line no-unused-vars
const movie1 = {
  "Title": "Italian Spiderman",
  "Year": "2007",
  "imdbID": "tt2705436",
  "Type": "movie",
  "Poster": "N/A"
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [searchResult, setsearchResult] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    setsearchResult(`${data.Search.length} search results for ${title}`);
  }

  useEffect(() => {
    searchMovies("movies")
  }, []
  )
  return (
    <div className="app">
      <h1>MovieSpy</h1>
      <div className="search">
        <input
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      
        <p style={{color:"#a1a1a1"}}>{searchResult}</p>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {
                movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))
              }
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }

    </div>
  )
}

export default App;