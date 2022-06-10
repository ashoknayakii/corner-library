import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;