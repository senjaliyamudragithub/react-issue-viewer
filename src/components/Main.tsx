import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Loader from "./Utils/Loader";
import NotFound from "./Utils/NotFound";
import FilterTab from "./Utils/FilterTab";
import IssueList from "./Issue/IssueList";
import { REPOSITORY_ISSUE_LIST } from "../query/repositoryIssueListQuery";

function Main() {
  const [tabValue, setTabValue] = useState("OPEN");
  const onTabChange = (newVal: string) => {
    setTabValue(newVal);
  };

  const { loading, error, data, fetchMore } = useQuery(REPOSITORY_ISSUE_LIST, {
    variables: {
      after: null,
      state: tabValue,
    },
  });
  const onLoadMore = () => {
    fetchMore({
      variables: {
        after: data.repository.issues.pageInfo.endCursor,
        state: tabValue,
      },
      updateQuery: (
        prev: { repository: { issues: { pageInfo: {}; edges: [] } } },
        { fetchMoreResult }
      ) => {
        if (!fetchMoreResult) return prev;
        return {
          repository: {
            ...prev.repository,
            issues: {
              ...prev.repository.issues,
              pageInfo: fetchMoreResult.repository.issues.pageInfo,
              edges: [
                ...prev.repository.issues.edges,
                ...fetchMoreResult.repository.issues.edges,
              ],
            },
          },
        };
      },
    });
  };
  if (error) return <NotFound />;
  if (loading) return <Loader />;

  return (
    <>
      <FilterTab
        openedCount={data.repository.openedCount.totalCount}
        closedCount={data.repository.closedCount.totalCount}
        onTabChange={onTabChange}
        tabValue={tabValue}
      />
      <IssueList list={data.repository.issues.edges} />
      <Button
        onClick={onLoadMore}
        variant="contained"
        color="primary"
        style={{ margin: "1% 45%" }}
      >
        Load more
      </Button>
    </>
  );
}

export default Main;
