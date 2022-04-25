import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import CharacterCard from "../Components/CharacterCard";
import {
  GET_CHARACTERS,
  GET_FAVORITE_CHARACTERS,
  GET_USER_BY_NAME,
} from "../APIs/Queries";

const CardContainer = () => {
  const [favoriteCharacterIDs, setFavoriteCharacterIDs] = useState([]);
  const [allCharacterData, setAllCharacterData] = useState([]);
  const [favoriteCharacterData, setFavoriteCharacterData] = useState([]);
  const [showFavoriteCharacters, setShowFavoriteCharacters] = useState(false);

  useQuery(GET_CHARACTERS, {
    fetchPolicy: "network-only",
    async onCompleted({ getAllCharacters }) {
      await getUserFavData();
      setAllCharacterData(getAllCharacters);
    },
    onError() {
      console.log("There is a error");
    },
  });

  const [getUserFavData, { loading: loadingUser }] = useLazyQuery(
    GET_USER_BY_NAME,
    {
      variables: {
        userName: sessionStorage.getItem("userName"),
      },
      async onCompleted({ getUserByName }) {
        setFavoriteCharacterIDs(getUserByName.savedCharacters);
        await getFavCharacters();
      },
      onError() {
        console.log("There is a error");
      },
    }
  );

  const [getFavCharacters, { loading: loadingFavCharacter }] = useLazyQuery(
    GET_FAVORITE_CHARACTERS,
    {
      fetchPolicy: "network-only",
      variables: {
        characterIds: favoriteCharacterIDs,
      },
      onCompleted: ({ getCharactersByIDs }) => {
        setFavoriteCharacterData(getCharactersByIDs);
      },
      onError() {
        console.log("There is a error");
      },
    }
  );

  const renderAllCharacterCards = () => {
    return (
      <>
        {allCharacterData.length > 0 ? (
          allCharacterData.map((item) => (
            <CharacterCard
              characterData={item}
              key={item.id}
              favoriteCharacterIDs={favoriteCharacterIDs}
            />
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
            <CharacterCard
              characterData={item}
              key={item.id}
              favoriteCharacterIDs={favoriteCharacterIDs}
            />
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
