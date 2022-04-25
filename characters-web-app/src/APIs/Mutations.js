import { gql } from "@apollo/client";

// ------------- <<< Mutation for create user >>> -------------
export const CREATE_USER = gql`
  mutation CreateUser($user: userCreateInput!) {
    createUser(user: $user) {
      id
      name
      savedCharacters
    }
  }
`;

// ------------- <<< Mutation for update user >>> -------------
export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $characterIds: [Int]) {
    updateUser(userId: $userId, characterIds: $characterIds) {
      id
      name
      savedCharacters
    }
  }
`;
