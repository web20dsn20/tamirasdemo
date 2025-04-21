jest.mock("react-router-dom");
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Create the mock function
const mockNavigate = jest.fn();

// Mock react-router-dom's useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate, // Use the mockNavigate function in your test
}));

describe("Login Form", () => {
  it("shows validation errors on empty submit", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/username is a required field/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/password is a required field/i)
      ).toBeInTheDocument();
    });
  });

  it("shows validation errors on empty submit", async () => {
    render(<App />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(
        screen.getByText(/username is a required field/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/password is a required field/i)
      ).toBeInTheDocument();
    });
  });

  it("submits the form with valid input", async () => {
    render(<App />);

    // Fill in form with valid data
    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "secret123" },
    });

    // Click submit
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for any errors to be removed after successful submission
    await waitFor(() => {
      expect(
        screen.queryByText(/username is a required field/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password is a required field/i)
      ).not.toBeInTheDocument();
    });

    // Test for navigation after successful form submission (you can modify this check as per your app)
    expect(mockNavigate).toHaveBeenCalledWith("/orderForm");
  });
});
