import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../APIs/Mutations";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CharacterCard = ({ characterData, favoriteCharacterIDs }) => {
  CharacterCard.propTypes = {
    characterData: PropTypes.object.isRequired,
    favoriteCharacterIDs: PropTypes.array.isRequired,
  };

  let userFavoriteDataArray = [...favoriteCharacterIDs];
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [clickedCharacter, setClickedCharacter] = useState("");

  useEffect(() => {
    userFavoriteDataArray.forEach((id) => {
      if (id === characterData.characterID) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    });
  }, []);

  const [handleFavCharacters, { loading: favCharacterLoading }] = useMutation(
    UPDATE_USER,
    {
      fetchPolicy: "network-only",
      variables: {
        userId: "6265b6aee8faf72dbcbe5e7c",
        // userId: sessionStorage.getItem("userID"),
        characterIds: userFavoriteDataArray,
      },
      async onCompleted({ updateUser }) {
        userFavoriteDataArray = [...updateUser.savedCharacters];
      },
    }
  );

  const handleSetFav = (id) => {
    setIsFavorite(true);
    if (!userFavoriteDataArray.includes(id)) {
      userFavoriteDataArray.push(id);
      handleFavCharacters();
    }
  };

  const handleUnsetFav = (id) => {
    setIsFavorite(false);
    const index = userFavoriteDataArray.indexOf(id);
    if (index > -1) {
      userFavoriteDataArray.splice(index, 1);
    }
    handleFavCharacters();
  };

  //   *********** episode data descending sort by dates ***********
  const episodeDataProcess = () => {
    const episodeData = [...characterData.episode];

    const sorter = (a, b) => {
      return new Date(a.air_date) - new Date(b.air_date);
    };
    episodeData.reverse(sorter);
    const sortedArray = episodeData.slice(0, 3);

    return (
      <ul className="extend-list">
        {sortedArray.map((item) => (
          <span key={item.id}>
            <li> {item.name} </li>
            <li className="extend-list-text"> {item.air_date} </li>
          </span>
        ))}
      </ul>
    );
  };

  return (
    <div className="card character-card">
      <div className="fav-icon-container">
        {isFavorite ? (
          <div
            className="fav-icon"
            onClick={() => {
              handleUnsetFav(characterData.characterID);
            }}
          >
            <FaHeart />
          </div>
        ) : (
          <div
            className="fav-icon"
            onClick={() => {
              handleSetFav(characterData.characterID);
            }}
          >
            <FaRegHeart />
          </div>
        )}
      </div>
      <div className="character-card-body">
        <div className="image-container">
          <img src={characterData.image} alt="Avatar" className="img"></img>
        </div>

        <div className="basic-info">
          <table className="info-table">
            <tbody>
              <tr className="tr">
                <td className="info-header">Name : </td>
                <td className="info-value"> {characterData.name} </td>
              </tr>
              <tr className="tr">
                <td className="info-header">Species :</td>
                <td className="info-value"> {characterData.species} </td>
              </tr>
              <tr className="tr">
                <td className="info-header">Gender : </td>
                <td className="info-value"> {characterData.gender} </td>
              </tr>
              <tr className="tr">
                <td className="info-header">Origin :</td>
                <td className="info-value"> {characterData.origin.name} </td>
              </tr>
              <tr className="tr">
                <td className="info-header">Dimension :</td>
                <td className="info-value">{characterData.origin.dimension}</td>
              </tr>
              <tr className="tr">
                <td className="info-header">Status :</td>
                <td className="info-value"> {characterData.status} </td>
              </tr>
            </tbody>
          </table>

          {!isExpand && (
            <div className="see-more-button-container">
              <button
                className="expand-button"
                onClick={() => {
                  setIsExpand(true);
                  setClickedCharacter(characterData.id);
                }}
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>

      {clickedCharacter === characterData.id && (
        <div className="expand-container">
          <div>
            <div className="expand-title">Latest Episodes :</div>
            {/* {episodeDataProcess()} */}
          </div>

          <div className="see-less-button-container">
            <button
              className="expand-button"
              onClick={() => {
                setIsExpand(false);
                setClickedCharacter("");
              }}
            >
              See Less
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
