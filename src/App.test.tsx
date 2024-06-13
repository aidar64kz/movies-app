import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";

describe("App component", async () => {
  it("should render the SearchBar and Router", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId("app")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("movie-list-page")).toBeInTheDocument()
    );
  });
});
