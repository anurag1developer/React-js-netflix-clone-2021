import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(requests.fetchNetflixOriginals);
      const randomNum = Math.floor(Math.random() * res.data.results.length - 1);
      console.log(res.data.results[randomNum]);
      setMovie(res.data.results[randomNum]);
      return res;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str && str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie && movie.backdrop_path})`,
        // backgroundImage:
        //   "url(https://image.tmdb.org/t/p/original/oKt4J3TFjWirVwBqoHyIvv5IImd.jpg)",
        backgroundPosition: "center center",
        objectFit: "contain",
        objectPosition: "top",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {(movie && movie.title) || movie.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h2 className="banner__description">
          {truncate(movie && movie.overview, 150)}
        </h2>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
};

export default Banner;
