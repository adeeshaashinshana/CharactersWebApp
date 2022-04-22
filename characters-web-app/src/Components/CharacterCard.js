import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CharacterCard = ({ characterData }) => {
  CharacterCard.propTypes = {
    characterData: PropTypes.object.isRequired,
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const [isExpand, setIsExpand] = useState(false);
  const [clickedToken, setClickedToken] = useState("");

  console.log("isExpand >>>", isExpand);
  console.log("clickedToken >>>", clickedToken);

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
        <div className="fav-icon" onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
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
                  setClickedToken(characterData.id);
                }}
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>

      {clickedToken === characterData.id && (
        <div className="expand-container">
          <div>
            <div className="expand-title">Latest Episodes :</div>
            {episodeDataProcess()}
          </div>

          <div className="see-less-button-container">
            <button
              className="expand-button"
              onClick={() => {
                setIsExpand(false);
                setClickedToken("");
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
