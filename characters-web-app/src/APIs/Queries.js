import { gql } from "@apollo/client";

// ------------- <<< Query for get all characters >>> -------------
export const GET_CHARACTERS = gql`
  query GetAllCharacters {
    getAllCharacters {
      _id
      name
      image
      gender
      species
      origin {
        name
        dimension
      }
      status
    }
  }
`;

// ------------- <<< Query for get user >>> -------------
export const GET_USER_BY_NAME = gql`
  query Query($userName: String) {
    getUserByName(userName: $userName) {
      id
      name
    }
  }
`;
