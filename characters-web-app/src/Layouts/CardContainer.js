import React from "react";
import { useQuery } from "@apollo/client";
import CharacterCard from "../Components/CharacterCard";
import { GET_CHARACTERS } from "../APIs/Queries";

const CardContainer = () => {
  useQuery(GET_CHARACTERS, {
    onCompleted: ({ characters, location, episodesByIds }) => {
      console.log("characters >>>", characters);
      console.log("location >>>", location);
      console.log("episodesByIds >>>", episodesByIds);
    },
    onError() {
      console.log("There is a error");
    },
  });

  return (
    <div className="character-card-container">
      <CharacterCard />
    </div>
  );
};

export default CardContainer;
