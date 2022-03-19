import { useState, useEffect } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMessage/errorMessage";

import cn from "classnames";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { error, loading, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();

    const timer = setInterval(updateChar, 100000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, []);

  const onCharLoaded = char => {
    console.log("CHAR", char);
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  };

  const errMsg = error ? <ErrorMsg /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errMsg}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={updateChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyle = null;

  if (thumbnail) {
    imgStyle = cn({
      "randomchar__img-contain": thumbnail.includes("image_not_available"),
      randomchar__img: !thumbnail.includes("image_not_available"),
    });
  }

  // if (thumbnail.includes("image_not_available")) {
  //   imgStyle = "randomchar__img-contain";
  // } else {
  //   imgStyle = "randomchar__img";
  // }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={imgStyle} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
