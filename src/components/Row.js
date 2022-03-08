import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      // console.table(response.data.results);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
    // if [], run once when the row loads, and don't run again
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleClick = (movie) => {
    console.log(movie.title || movie.original_name || movie.name);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        (movie && movie.title) || movie.original_name || movie.name || ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const trailerId = urlParams.get("v");
          setTrailerUrl(trailerId);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
