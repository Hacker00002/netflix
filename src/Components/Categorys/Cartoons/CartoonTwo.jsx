import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import netflix from "../../../Assets/logo/pngwing.com.png";
import cartoon from "../../Categorys/Cartoons/cartoon.module.css";
import Header from "../../Header/Header";

const CartoonsTwo = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=2576e26d3fabae45b3ca2a56844da15a&language=en-US&query=smurf&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((elem) => {
        setData(elem.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const imageUrl = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterpath}`;
  };

  return (
    <>
      <div className="container">
        <div className={cartoon.cartoon__father}>
          {data?.map((elem) => {
            return (
              <div className={cartoon.slider}>
                <img src={netflix} className={cartoon.img__netflix} alt="" />
                <Link to={`/movie-product/${elem.id}`}>
                  <img
                    className={cartoon.cartoon__img}
                    src={imageUrl(elem?.poster_path)}
                  />
                  <p className={cartoon.text}>{elem?.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CartoonsTwo;
