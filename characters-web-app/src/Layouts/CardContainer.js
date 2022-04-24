import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import CharacterCard from "../Components/CharacterCard";
import { GET_CHARACTERS, GET_FAVORITE_CHARACTERS } from "../APIs/Queries";

const CardContainer = () => {
  const getUserFavoriteData = sessionStorage.getItem("userFavData");
  const userFavoriteDataArray = getUserFavoriteData
    .split(",")
    .map(function (item) {
      return parseInt(item, 10);
    });
  const [allCharacterData, setAllCharacterData] = useState([]);
  const [favoriteCharacterData, setFavoriteCharacterData] = useState([]);
  const [showFavoriteCharacters, setShowFavoriteCharacters] = useState(false);

  useQuery(GET_CHARACTERS, {
    onCompleted: ({ getAllCharacters }) => {
      setAllCharacterData(getAllCharacters);
    },
    onError() {
      console.log("There is a error");
    },
  });

  useQuery(GET_FAVORITE_CHARACTERS, {
    variables: {
      characterIds: userFavoriteDataArray,
    },
    onCompleted: ({ getCharactersByIDs }) => {
      setFavoriteCharacterData(getCharactersByIDs);
    },
    onError() {
      console.log("There is a error");
    },
  });

  const renderAllCharacterCards = () => {
    return (
      <>
        {allCharacterData.length > 0 ? (
          allCharacterData.map((item) => (
            <CharacterCard characterData={item} key={item.id} />
          ))
        ) : (
          <div> No any data </div>
        )}
      </>
    );
  };

  const renderFavoriteCharacterCards = () => {
    return (
      <>
        {favoriteCharacterData.length > 0 ? (
          favoriteCharacterData.map((item) => (
            <CharacterCard characterData={item} key={item.id} />
          ))
        ) : (
          <div> No any data </div>
        )}
      </>
    );
  };

  return (
    <div className="character-card-container">
      <div className="fav-button-container">
        <button
          onClick={() => {
            setShowFavoriteCharacters(!showFavoriteCharacters);
          }}
        >
          {showFavoriteCharacters
            ? "Display All Characters"
            : "Display Favorite Characters"}
        </button>
      </div>
      <div>
        {showFavoriteCharacters
          ? renderFavoriteCharacterCards()
          : renderAllCharacterCards()}
      </div>
    </div>
  );
};

export default CardContainer;
