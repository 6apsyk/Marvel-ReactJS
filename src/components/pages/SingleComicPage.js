import "./singleComic.scss";
import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMessage/errorMessage";
import AppBanner from "../appBanner/AppBanner";

const SingleComicPage = () => {
  const { comicId } = useParams();

  const [comic, setComic] = useState(null);
  const { error, loading, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComics(comicId).then(onComicLoaded);
  };

  const onComicLoaded = comic => {
    console.log("COMIC", comic);
    setComic(comic);
  };

  const errMsg = error ? <ErrorMsg /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      <AppBanner />
      {errMsg}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, price, thumbnail, language } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
