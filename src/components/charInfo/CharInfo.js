import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

import "./charInfo.scss";
import { Link } from "react-router-dom";
import setContent from "../utils/setContent";

const CharInfo = props => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  console.log("render CHARINFO");

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.cardId]);

  const updateChar = () => {
    const { cardId } = props;

    if (!cardId) {
      return;
    }

    clearError();
    getCharacter(cardId)
      .then(onCharLoaded)
      .then(() => setProcess("fulfilled"));
  };

  const onCharLoaded = char => {
    setChar(char);
  };

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

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
