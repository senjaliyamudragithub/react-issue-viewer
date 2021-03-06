import { gql } from "@apollo/client";

export const REPOSITORY_INFO = gql`
  query RepoInfo {
    repository(name: "react", owner: "facebook") {
      id
      name
      description
      stargazers {
        totalCount
      }
    }
  }
`;
