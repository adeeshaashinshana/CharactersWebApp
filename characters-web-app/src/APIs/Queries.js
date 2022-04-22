import { gql } from "@apollo/client";

// ------------- <<< Query for get all characters >>> -------------
export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        image
        name
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
  }
`;
