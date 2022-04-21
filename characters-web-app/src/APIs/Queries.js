import { gql } from "@apollo/client";

// ------------- <<< Query for get all characters >>> -------------
export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 2, filter: { name: "rick" }) {
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
        }
        status
        episode {
          id
          name
          air_date
        }
      }
    }
    episodesByIds(ids: [23]) {
      id
      name
      air_date
    }
  }
`;
