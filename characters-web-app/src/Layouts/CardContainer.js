import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import CharacterCard from "../Components/CharacterCard";
import { GET_CHARACTERS } from "../APIs/Queries";

const CardContainer = () => {
  const [allCharacterData, setAllCharacterData] = useState(null);

  useQuery(GET_CHARACTERS, {
    onCompleted: ({ characters }) => {
      setAllCharacterData(characters);
    },
    onError() {
      console.log("There is a error");
    },
  });

  const renderCards = () => {
    return (
      <>
        {allCharacterData.results.map((item) => (
          <CharacterCard characterData={item} key={item.id} />
        ))}
      </>
    );
  };

  return (
    <div className="character-card-container">
      {allCharacterData ? renderCards() : <div> No any data </div>}
    </div>
  );
};

export default CardContainer;
