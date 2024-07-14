import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "../component/main/post";
import { getApiSearch } from "../component/api/getApiSearch";

jest.mock("../component/api/getApiSearch");

const mockedGetApiSearch = getApiSearch as jest.Mock;

describe("Post", () => {
  beforeEach(() => {
    mockedGetApiSearch.mockClear();
  });

  test('displays "Oops, looks like nothing was found" when no data is returned', async () => {
    mockedGetApiSearch.mockResolvedValue({ results: [] });

    render(
      <Router>
        <Post />
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Oops, looks like nothing was found"),
      ).toBeInTheDocument();
    });
  });

  test("displays links with correct names from fetched data", async () => {
    const mockData = {
      results: [
        { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
        { title: "A New Hope", url: "https://swapi.dev/api/films/1/" },
      ],
    };
    mockedGetApiSearch.mockResolvedValue(mockData);

    render(
      <Router>
        <Post />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });
  });
});
