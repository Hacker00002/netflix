import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import Loader from "../Loader/Loader";
import netflix from "../../Assets/logo/pngwing.com.png";
import post1 from "../../Styles/MoviePost-1/moviePost-1.module.css";

const MoviePostOne = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=2576e26d3fabae45b3ca2a56844da15a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
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
  if (loader) {
    return <Loader />;
  }
  const imageUrl = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterpath}`;
  };

  return (
    <div className="container">
      <>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            clickable: true,
          }}
          modules={[Navigation]}
          className={post1.swipe}
        >
          {data.map((elem) => {
            return (
              <>
                <div className={post1.slider}>
                  <SwiperSlide className={post1.swiper__slide}>
                    <div className={post1.favorite}>
                      <a class="fa-regular fa-heart"></a>
                    </div>
                    <img src={netflix} className={post1.img__netflix} alt="" />
                    <Link to={`/movie-product/${elem.id}`}>
                      <img src={imageUrl(elem?.poster_path)} />
                    </Link>
                    <p className={post1.text}>{elem?.title}</p>
                  </SwiperSlide>
                </div>
              </>
            );
          })}
        </Swiper>
      </>
    </div>
  );
};

export default MoviePostOne;
