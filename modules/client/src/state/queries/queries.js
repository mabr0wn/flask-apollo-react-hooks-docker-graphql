import { gql } from 'apollo-boost';


export const GET_USERS_BLOGS = gql`
  query {
  users {
    edges {
      node {
        id,
        username,
        email
        blog {
          id,
          title,
          text
        },
        role {
          id,
          name
        }
      }
    }
  }
}
`