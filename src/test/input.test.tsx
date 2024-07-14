import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import Input from "../component/header/input";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ search: "Skywalker" }),
}));

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <Router>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </Router>,
  );
};

describe("Input", () => {
  test("retrieves value from local storage on mount", () => {
    localStorage.setItem("search", "Skywalker");

    renderWithRouter(<Input className="test-input" placeholder="Search" />);

    const inputElement = screen.getByPlaceholderText("Search");
    expect(inputElement).toHaveValue("Skywalker");
  });

  test("saves entered value to local storage", () => {
    renderWithRouter(<Input className="test-input" placeholder="Search" />);

    const inputElement = screen.getByPlaceholderText("Search");
    fireEvent.change(inputElement, { target: { value: "Obi-Wan" } });

    expect(localStorage.getItem("search")).toBe("Obi-Wan");
  });

  test("uses default value when local storage is empty", () => {
    renderWithRouter(<Input className="test-input" placeholder="Search" />);

    const inputElement = screen.getByPlaceholderText("Search");
    expect(inputElement).toHaveValue("Skywalker");
  });

  test("updates state based on URL parameter", () => {
    renderWithRouter(<Input className="test-input" placeholder="Search" />);

    const inputElement = screen.getByPlaceholderText("Search");
    expect(inputElement).toHaveValue("Skywalker");
  });
});
