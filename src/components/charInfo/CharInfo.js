import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMessage/errorMessage";

import "./charInfo.scss";
import { Link } from "react-router-dom";

const CharInfo = props => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.cardId]);

  const updateChar = () => {
    const { cardId } = props;

    if (!cardId) {
      return;
    }

    getCharacter(cardId).then(onCharLoaded);
  };

  const onCharLoaded = char => {
    setChar(char);
  };

  const skeleton = error || loading || char ? null : <Skeleton />;
  const errMsg = error ? <ErrorMsg /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {errMsg}
      {spinner}
      {skeleton}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = {};
  if (thumbnail.includes("image_not_available")) {
    imgStyle = { objectFit: "contain" };
  } else {
    imgStyle = { objectFit: "cover" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : <h2>Список комиксов пуст!</h2>}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <Link to={`/comics/${item.resourceURI.split("/").pop()}`} className="char__comics-item" key={i}>
              <li>{item.name}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
