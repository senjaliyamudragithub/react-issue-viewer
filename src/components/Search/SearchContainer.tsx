import React from "react";
import { useLazyQuery } from "@apollo/client";
import Loader from "../Utils/Loader";
import IssueList from "../Issue/IssueList";
import SearchHeader from "./SearchHeader";
import { SEARCH_ISSUE_QUERY } from "../../query/searchIssueQuery";

const formQueryString = (searchField: string, status: string) =>
  `${searchField} repo:facebook/react in:title in:body type:issue state:${status}`;

const SearchContainer = () => {
  const [searchField, setSearchField] = React.useState("");
  const [stateValue, setStateValue] = React.useState("open");
  const [loadResult, { loading, data }] = useLazyQuery(SEARCH_ISSUE_QUERY);
console.log(loading,data)
  const onChangeSearchField = (event: React.FormEvent) => {
    const target = event.target as HTMLSelectElement;
    setSearchField(target.value);
  };
  const onStateChange = (event: React.FormEvent) => {
    const target = event.target as HTMLSelectElement;
    setStateValue(target.value);
  };
  const onFindResult = (event: React.MouseEventHandler<HTMLButtonElement>) => {
    console.log("call")
    loadResult({
      variables: { query: formQueryString(searchField, stateValue) },
    });
  };

  return (
    <>
      <SearchHeader
        searchField={searchField}
        onChangeSearchField={onChangeSearchField}
        stateValue={stateValue}
        onStateChange={onStateChange}
        onFindResult={onFindResult}
      />
      {loading && <Loader />}
      {data && data.search.edges.length > 0 && (
        <IssueList list={data.search.edges} />
      )}
    </>
  );
};

export default SearchContainer;
