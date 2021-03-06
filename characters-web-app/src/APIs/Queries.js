import { gql } from "@apollo/client";

// ------------- <<< Query for get all characters >>> -------------
export const GET_CHARACTERS = gql`
  query GetAllCharacters {
    getAllCharacters {
      characterID
      name
      image
      gender
      species
      origin {
        name
        dimension
      }
      status
      episode {
        id
        name
        air_date
      }
    }
  }
`;

// ------------- <<< Query for get all characters >>> -------------
export const GET_FAVORITE_CHARACTERS = gql`
  query GetFavoriteCharacters($characterIds: [Int]) {
    getCharactersByIDs(characterIds: $characterIds) {
      id
      characterID
      name
      image
      species
      gender
      origin {
        name
        dimension
      }
      status
      episode {
        id
        name
        air_date
      }
    }
  }
`;

// ------------- <<< Query for get user >>> -------------
export const GET_USER_BY_NAME = gql`
  query GetUserByName($userName: String) {
    getUserByName(userName: $userName) {
      id
      name
      savedCharacters
    }
  }
`;
