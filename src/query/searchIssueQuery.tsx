import { gql } from "@apollo/client";

export const SEARCH_ISSUE_QUERY = gql`
  query SearchIssue($query: String!) {
    search(query: $query, type: ISSUE, first: 10) {
      edges {
        node {
          ... on Issue {
            id
            title
            comments {
              totalCount
            }
            author {
              avatarUrl(size: 10)
              ... on User {
                id
                name
                databaseId
              }
            }
            createdAt
            title
            state
            updatedAt
            id
            number
          }
        }
      }
    }
  }
`;
