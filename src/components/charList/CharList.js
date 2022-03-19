import { useEffect, useRef, useState } from "react";
import "./charList.scss";

import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMessage/errorMessage";

const setContent = (process, Component, newLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "pending":
      return newLoading ? <Component /> : <Spinner />;
    case "fulfilled":
      return <Component />;
    case "rejected":
      return <ErrorMsg />;
    default:
      throw new Error("Unexpected process state");
  }
};

const CharList = props => {
  const [charList, setCharList] = useState([]);
  const [newLoading, setNewLoading] = useState(false);
  const [offset, setOffset] = useState(+localStorage.getItem("offset") || 210);

  const { process, setProcess, getAllCharacter } = useMarvelService();

  useEffect(() => {
    onCharLoading(offset, true);
    // eslint-disable-next-line
  }, []);

  const onCharLoading = (offset, initial) => {
    initial ? setNewLoading(false) : setNewLoading(true);

    getAllCharacter(offset)
      .then(res => {
        setCharList(charList => [...charList, ...res]);
        setNewLoading(false);
        setOffset(offset + 9);
      })
      .then(localStorage.setItem("offset", offset))
      .then(() => setProcess("fulfilled"));
  };

  // const updateCharList = () => {
  //   MarvelService1.getAllCharacter()
  //     .then(res => this.setState({ charList: res, loading: false }))
  //     .catch(onError);
  // };

  let myRef = useRef([]);

  const focusOnItem = id => {
    myRef.current.forEach(item => item.classList.remove("char__item_selected"));
    myRef.current[id].classList.add("char__item_selected");
    myRef.current[id].focus();
  };

  const chars = arr => {
    const items = arr.map((char, i) => {
      // const clazz = nameActive === char.name ? "char__item char__item_selected" : "char__item";

      let imgStyle = {};
      if (char.thumbnail.includes("image_not_available")) {
        imgStyle = { objectFit: "fill" };
      } else {
        imgStyle = { objectFit: "cover" };
      }

      return (
        <li
          tabIndex={0}
          ref={el => (myRef.current[i] = el)}
          key={char.id}
          name={char.name}
          className={"char__item"}
          onClick={() => {
            props.onSelectedChar(char.id);
            focusOnItem(i);
          }}
          onKeyPress={e => {
            if (e.code === "" || e.code === "Enter") {
              props.onSelectedChar(char.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={char.thumbnail} alt={char.name} style={imgStyle} />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  return (
    <div className="char__list">
      {setContent(process, () => chars(charList), newLoading)}
      <button
        disabled={newLoading}
        className="button button__main button__long"
        onClick={() => onCharLoading(offset)}
        // style={offset >= 1559 ? { display: "none" } : { display: "block" }}
        style={{ display: offset >= 1559 ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
      {offset >= 1559 ? <h2 style={{ textAlign: "center", marginTop: 17 }}>Персонажей больше нет</h2> : null}
    </div>
  );
};

CharList.propTypes = {
  onSelectedChar: PropTypes.func,
};
export default CharList;
