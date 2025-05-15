// src/__tests__/App.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App"; // This will work if App.js is inside src/

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));

  await waitFor(() => {
    expect(screen.getByText(/lorem testum 1/i)).toBeInTheDocument();
    expect(screen.getByText(/lorem testum 2/i)).toBeInTheDocument();
  });
});
