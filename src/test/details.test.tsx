import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
// @ts-ignore
import {
  BrowserRouter as Router,
  Route,
  Routes,
  MemoryRouter,
} from "react-router-dom";
import Details from "../component/main/details";
import { getApiSearch } from "../component/api/getApiSearch";

jest.mock("../component/api/getApiSearch");
const mockedGetApiSearch = getApiSearch as jest.Mock;

describe("Details", () => {
  test("displays data after fetching", async () => {
    const mockData = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
    };
    mockedGetApiSearch.mockResolvedValue(mockData);

    render(
      <MemoryRouter initialEntries={["/main/people/search/page/1/details/1_1"]}>
        <Routes>
          <Route
            path="/main/:root/:search/page/:idPage/details/:idDetails"
            element={<Details />}
          />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("name: Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("height: 172")).toBeInTheDocument();
      expect(screen.getByText("mass: 77")).toBeInTheDocument();
    });
  });
});
