// apps/frontend/app/components/__tests__/Navbar.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from "../app/components/Navbar";

describe("Navbar", () => {
  it("renders the Navbar component", () => {
    render(<Navbar />);


    const itineraryLink = screen.getByText("Itineraries");
    const homeLink = screen.getByText('Home');
    const searchLink = screen.getByText('Search');
    const accountLink = screen.getByText('Account');

    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(itineraryLink).toBeInTheDocument();
    expect(accountLink).toBeInTheDocument();
  });
});
