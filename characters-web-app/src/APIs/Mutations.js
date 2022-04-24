import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($user: userCreateInput!) {
    createUser(user: $user) {
      id
      name
      savedCharacters
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $characterIds: [Int]) {
    updateUser(userId: $userId, characterIds: $characterIds) {
      id
      name
      savedCharacters
    }
  }
`;
