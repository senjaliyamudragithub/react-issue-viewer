import React from "react";
import { render, screen } from "@testing-library/react";
import SearchHeader from "./SearchHeader";

describe("SearchHeader", () => {

  beforeEach(() => {
    render(<SearchHeader />);
  });

  it("renders SearchHeader", async () => {
    const searchText = await screen.findAllByText(/Search Issue/);
    expect(searchText).toHaveLength(2);
    expect(screen.getByText(/Open/i)).toBeInTheDocument();
    expect(screen.getByText(/Close/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Search here")).toBeInTheDocument();
    expect(screen.getByTestId("radio-group")).toBeInTheDocument();
  });
  
});
