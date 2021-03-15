import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { REPOSITORY_ISSUE_LIST } from "../query/repositoryIssueListQuery";
import { BrowserRouter as Router } from "react-router-dom";
import dateTransformer from "../helpers/dateTransformer";
import Main from "./Main";

const createdAt = "2021-03-14T00:48:29Z";
let commentCount = 30;
let openCount = 20;
let closeCount = 10;
const getMock = () => [
  {
    request: {
      query: REPOSITORY_ISSUE_LIST,
      variables: {
        after: null,
        state: "OPEN",
      },
    },
    result: () => {
      return {
        loading: false,
        data: {
          repository: {
            closedCount: {
              totalCount: closeCount,
            },
            openedCount: {
              totalCount: openCount,
            },
            issues: {
              edges: [
                {
                  node: {
                    author: {
                      name: "Mudra",
                      url: "sampleURL",
                    },
                    comments: {
                      totalCount: commentCount,
                    },
                    createdAt: createdAt,
                    id: "MDU6SXNzdWU4MzEwMzQ1ODE=",
                    number: 21000,
                    state: "OPEN",
                    title:
                      "Bug: Anchors tags are not working in chromium browser",
                  },
                },
              ],
            },
          },
        },
      };
    },
  },
];

const WrappedComponent = () => (
  <MockedProvider
    mocks={getMock()}
    addTypename={false}
    defaultOptions={{
      watchQuery: { fetchPolicy: "no-cache" },
      query: { fetchPolicy: "no-cache" },
    }}
  >
    <Router>
      <Main />
    </Router>
  </MockedProvider>
);

describe("Main Dashboard", () => {
  it("renders list of issues", async () => {
    render(<WrappedComponent />);
    await screen.findByText(
      "Bug: Anchors tags are not working in chromium browser"
    );
    await screen.findByText(/20 Open/i);
    await screen.findByText(/10 Closed/i);
    await screen.findByText(/# 21000/i);
    await screen.findByText(`opened on ${dateTransformer(createdAt)} by Mudra`);
    expect(screen.getByText(/Load more/i)).toBeInTheDocument();
    expect(screen.getByTestId("custom-state-element")).toBeInTheDocument();
    expect(screen.getByTestId("comment-badge")).toBeInTheDocument();
  });

  it("does not render comment badge when comment count is 0", async () => {
    commentCount = 0;
    openCount = 100;
    closeCount = 500;
    render(<WrappedComponent />);
    await screen.findByText(
      "Bug: Anchors tags are not working in chromium browser"
    );
    await screen.findByText(`${openCount} Open`);
    await screen.findByText(`${closeCount} Closed`);
    await screen.findByText(/# 21000/i);
    await screen.findByText(`opened on ${dateTransformer(createdAt)} by Mudra`);
    expect(screen.getByText(/Load more/i)).toBeInTheDocument();
    expect(screen.getByTestId("custom-state-element")).toBeInTheDocument();
    expect(screen.queryByText("comment-badge")).not.toBeInTheDocument();
  });
  
});
