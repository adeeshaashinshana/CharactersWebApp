import React, { useState } from "react";

const CharacterCard = () => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className="card character-card">
      <div className="character-card-body">
        <div className="image-container">
          <img
            src="https://picsum.photos/200/200"
            alt="Avatar"
            className="img"
          ></img>
        </div>

        <div className="basic-info">
          <table className="info-table">
            <tr className="tr">
              <td className="info-header">Name : </td>
              <td className="info-value">Griffin</td>
            </tr>
            <tr className="tr">
              <td className="info-header">Species :</td>
              <td className="info-value">Griffin</td>
            </tr>
            <tr className="tr">
              <td className="info-header">Gender : </td>
              <td className="info-value">Griffin</td>
            </tr>
            <tr className="tr">
              <td className="info-header">Origin :</td>
              <td className="info-value">Griffin</td>
            </tr>
            <tr className="tr">
              <td className="info-header">Dimension : </td>
              <td className="info-value">Griffin</td>
            </tr>
            <tr className="tr">
              <td className="info-header">Status :</td>
              <td className="info-value">Griffin</td>
            </tr>
          </table>

          {!isExpand && (
            <div className="see-more-button-container">
              <button
                className="expand-button"
                onClick={() => setIsExpand(true)}
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>

      {isExpand && (
        <div className="expand-container">
          <div>
            <div className="expand-title">Latest Episodes :</div>
            <ul className="extend-list">
              <li>Coca Cola</li>
              <li className="extend-list-text">Coca Cola</li>
              <li>Coca Cola</li>
              <li className="extend-list-text">Coca Cola</li>
              <li>Coca Cola</li>
              <li className="extend-list-text">Coca Cola</li>
            </ul>
          </div>

          <div className="see-less-button-container">
            <button
              className="expand-button"
              onClick={() => setIsExpand(false)}
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
