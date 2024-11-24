import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../pages/HomePage";

// mocking the child components
jest.mock("../components/CustomTabPanel", () => ({
    __esModule: true,
    default: ({ value, index, children }: { value: number; index: number; children: React.ReactNode }) => (
        value === index ? <div>{children}</div> : null
    ),
}));

jest.mock("../pages/NoCPage", () => ({
    __esModule: true,
    default: ({ onSubmit }: { onSubmit: (noc: number) => void }) => (
        <button onClick={() => onSubmit(5)}>Submit NoC</button>
    ),
}));

jest.mock("../pages/CalculationsPage", () => ({
    __esModule: true,
    default: ({ numberOfCalculations }: { numberOfCalculations: number }) => (
        <div>Calculations: {numberOfCalculations}</div>
    ),
}));

describe("HomePage Component", () => {
    test("renders tabs and default tab content", () => {
        render(<HomePage />);

        // Verify tabs are rendered
        expect(screen.getByRole("tab", { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: /calculations/i })).toBeInTheDocument();

        // Verify the default tab content
        expect(screen.getByText("Submit NoC")).toBeInTheDocument();
        expect(screen.queryByText(/calculations:/i)).not.toBeInTheDocument();
    });

    test("handles tab switch correctly", () => {
        render(<HomePage />);

        // Click the "Submit NoC" button to trigger the onSubmitNoC handler
        fireEvent.click(screen.getByText("Submit NoC"));

        // Verify that the active tab is switched to "Calculations" and content is updated
        expect(screen.getByText(/calculations:/i)).toHaveTextContent("Calculations: 5");
    });

    test("disables 'Calculations' tab when inactive", () => {
        render(<HomePage />);

        const calculationsTab = screen.getByRole("tab", { name: /calculations/i });
        expect(calculationsTab).toHaveAttribute("aria-disabled", "true");

        // Click "Submit NoC" to activate the Calculations tab
        fireEvent.click(screen.getByText("Submit NoC"));
        expect(calculationsTab).toHaveAttribute("aria-disabled", "false");
    });
});