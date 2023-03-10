import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import netflix from "../../../Assets/logo/pngwing.com.png";
import movies from "../../Categorys/PopularMovies/popular.module.css";
import Header from "../../Header/Header";
import MoviePopularTwo from "./PolularTwo";
import MoviePopularThree from "./PopulraThree";
import MoviePopularFour from "./PolularFour";
import Loader from "../../Loader/Loader";

const MoviePopular = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=2576e26d3fabae45b3ca2a56844da15a`
    )
      .then((res) => res.json())
      .then((elem) => {
        setData(elem.results);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const imageUrl = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterpath}`;
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className={movies.cartoon__father}>
          {data?.map((elem) => {
            return (
              <div className={movies.slider}>
                <img src={netflix} className={movies.img__netflix} alt="" />
                <Link to={`/movie-product/${elem.id}`}>
                  <img
                    className={movies.cartoon__img}
                    src={imageUrl(elem?.poster_path)}
                  />
                  <p className={movies.text}>{elem?.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
        <MoviePopularTwo />
        <MoviePopularFour />
        <MoviePopularThree />
      </div>
    </>
  );
};

export default MoviePopular;
