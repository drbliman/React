import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../component/header/button";

describe("Button Component", () => {
  test("renders button with text content", () => {
    const { getByText } = render(<Button textContent="Click me" />);
    const buttonElement = getByText("Click me");
    expect(buttonElement).toHaveTextContent("Click me");
  });

  test("applies the correct class name", () => {
    const { getByText } = render(
      <Button className="buttonSearch" textContent="Click me" />,
    );
    const buttonElement = getByText("Click me");
    expect(buttonElement).toHaveClass("buttonSearch");
  });

  test("dispatches searchEvent when className is buttonSearch", () => {
    const { getByText } = render(
      <Button className="buttonSearch" textContent="Click me" />,
    );
    const buttonElement = getByText("Click me");

    const handleSearchEvent = jest.fn();
    window.addEventListener("searchEvent", handleSearchEvent);

    fireEvent.click(buttonElement);
    expect(handleSearchEvent).toHaveBeenCalled();

    window.removeEventListener("searchEvent", handleSearchEvent);
  });

  test("dispatches errorEvent when className is not buttonSearch", () => {
    const { getByText } = render(
      <Button className="buttonError" textContent="Click me" />,
    );
    const buttonElement = getByText("Click me");

    const handleErrorEvent = jest.fn();
    window.addEventListener("errorEvent", handleErrorEvent);

    fireEvent.click(buttonElement);
    expect(handleErrorEvent).toHaveBeenCalled();

    window.removeEventListener("errorEvent", handleErrorEvent);
  });
});
