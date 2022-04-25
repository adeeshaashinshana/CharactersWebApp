import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import CharacterCard from "../Components/CharacterCard";
import Pagination from "../Components/Pagination";
import { FaHeart, FaRegHeart, FaSpinner } from "react-icons/fa";
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
  const [errors, setErrors] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [characterPerPage] = useState(10);

  useQuery(GET_CHARACTERS, {
    fetchPolicy: "network-only",
    async onCompleted({ getAllCharacters }) {
      await getUserFavData();
      setAllCharacterData(getAllCharacters);
    },
    onError() {
      setErrors(true);
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
        setErrors(true);
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
        setErrors(true);
      },
    }
  );

  // Get current characters
  const indexOfLastCharacter = currentPage * characterPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - characterPerPage;
  const currentCharacters = allCharacterData.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const currentFavCharacters = favoriteCharacterData.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderAllCharacterCards = () => {
    return (
      <>
        {allCharacterData.length > 0 && !errors ? (
          currentCharacters.map((item) => (
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
        {favoriteCharacterData.length > 0 && !errors ? (
          currentFavCharacters.map((item) => (
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
      {loadingUser || loadingFavCharacter ? (
        <div className="loader-container">
          <FaSpinner className="loader" />
          <h2> Fetching Data...</h2>
          <h5> Please be patient...</h5>
        </div>
      ) : (
        <>
          <div className="fav-button-container">
            {(favoriteCharacterData.length > 0 ||
              allCharacterData.length > 0) && (
              <button
                onClick={() => {
                  setShowFavoriteCharacters(!showFavoriteCharacters);
                }}
                className="fav-button"
              >
                {showFavoriteCharacters ? (
                  <span>
                    <FaRegHeart /> Display All Characters
                  </span>
                ) : (
                  <span>
                    <FaHeart /> Display Favorite Characters
                  </span>
                )}
              </button>
            )}
          </div>
          <div>
            {showFavoriteCharacters
              ? renderFavoriteCharacterCards()
              : renderAllCharacterCards()}
          </div>
          {showFavoriteCharacters ? (
            <Pagination
              characterPerPage={characterPerPage}
              totalCharacters={favoriteCharacterData.length}
              paginate={paginate}
            />
          ) : (
            <Pagination
              characterPerPage={characterPerPage}
              totalCharacters={allCharacterData.length}
              paginate={paginate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CardContainer;
