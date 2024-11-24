import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalculationsPage from "../pages/CalculationsPage";
import { generateCalculations } from "../utils";

// Mock the `generateCalculations` utility
jest.mock("../utils", () => ({
    generateCalculations: jest.fn(),
}));

jest.mock("../components/Timer", () => ({
    __esModule: true,
    default: ({ stopCount, runOut }: { stopCount: boolean; runOut: () => void }) => (
        <div>
            Timer Mock
            <button onClick={() => !stopCount && runOut()}>Run Out</button>
        </div>
    ),
}));

jest.mock("../components/CalculationCard", () => ({
    __esModule: true,
    default: ({
                  calculation,
                  isCorrect,
                  editable,
              }: {
        calculation: { firstNumber: number; secondNumber: number; resultNumber: number; operator: string };
        isCorrect: (res: boolean) => void;
        editable: boolean;
    }) => (
        <div
            data-testid="calculation-card"
            style={{ outline: editable ? "none" : "solid red" }}
            onClick={() => isCorrect(calculation.resultNumber === 10)}
        >
            {calculation.firstNumber} {calculation.operator} {calculation.secondNumber}
        </div>
    ),
}));

describe("CalculationsPage Component", () => {
    const mockCalculations = [
        { firstNumber: 5, secondNumber: 5, operator: "+", resultNumber: 10 },
        { firstNumber: 7, secondNumber: 3, operator: "+", resultNumber: 10 },
    ];

    beforeEach(() => {
        (generateCalculations as jest.Mock).mockReturnValue(mockCalculations);
    });

    test("renders the correct number of CalculationCards", () => {
        render(<CalculationsPage numberOfCalculations={2} />);

        const calculationCards = screen.getAllByTestId("calculation-card");
        expect(calculationCards).toHaveLength(2);
    });

    test("updates calculation results correctly", () => {
        render(<CalculationsPage numberOfCalculations={2} />);

        // Simulate resolving the first calculation correctly
        const calculationCards = screen.getAllByTestId("calculation-card");
        fireEvent.click(calculationCards[0]); // This simulates a correct result (resultNumber is 10)

        // Verify the success toast appears after all calculations are completed
        fireEvent.click(calculationCards[1]); // This simulates a correct result

        expect(screen.getByText(/all calculations are done/i)).toBeInTheDocument();
        expect(screen.getByText(/success rate is 100%/i)).toBeInTheDocument();
    });

    test("handles timer running out", () => {
        render(<CalculationsPage numberOfCalculations={2} />);

        // Trigger the timer run-out logic
        fireEvent.click(screen.getByText("Run Out"));

        // Verify the error toast appears
        expect(screen.getByText(/you ran out of time/i)).toBeInTheDocument();
        expect(screen.getByText(/you have calculated 0 of 2 calculations/i)).toBeInTheDocument();
    });
});