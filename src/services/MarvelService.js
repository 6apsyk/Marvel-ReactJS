import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=c4d09ec4c17945b0fde33ec75cc18051";
  const _offsetPage = 210;

  const { error, loading, request, clearError } = useHttp();

  // getResourse = async url => {
  //   try {
  //     const res = await fetch(url);
  //     if (res.ok) {
  //       return await res.json();
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const getAllCharacter = async (offset = _offsetPage) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_tranformCharacter);
  };

  const getCharacter = async id => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _tranformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_tranformComics);
  };

  const getComics = async id => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _tranformComics(res.data.results[0]);
  };

  const _tranformCharacter = char => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _tranformComics = comics => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
      price: comics.prices[0].price ? comics.prices[0].price + "$" : "NOT AVAILABLE",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects.language || "en-us",
    };
  };

  return { loading, error, getAllCharacter, getCharacter, getAllComics, getComics, clearError };
};

export default useMarvelService;
