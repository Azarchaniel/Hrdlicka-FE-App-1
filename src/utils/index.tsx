import {ICalculation} from "../types";

export const generateCalculations = (numOfCalculations: number): ICalculation[] => {
    const operators = ['+', '-', '*', '÷'];
    const calculations: ICalculation[] = [];
    const seenCalculations = new Set<string>(); // To store unique calculation strings

    while (calculations.length < numOfCalculations) {
        let firstNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
        let secondNumber = Math.floor(Math.random() * 10) + 1;
        let operator = operators[Math.floor(Math.random() * operators.length)]; // Get random operator

        let result;

        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;

            case '-':
                if (firstNumber < secondNumber) {
                    [firstNumber, secondNumber] = [secondNumber, firstNumber];
                }
                result = firstNumber - secondNumber;
                break;

            case '*':
                result = firstNumber * secondNumber;
                break;

            case '÷':
                while (firstNumber % secondNumber !== 0) {
                    firstNumber = Math.floor(Math.random() * 10) + 1;
                    secondNumber = Math.floor(Math.random() * 10) + 1;
                }
                result = firstNumber / secondNumber;
                break;

            default:
                result = 0;
                break;
        }

        // Generate a unique string representation of the calculation
        const calculationKey = `${firstNumber}${operator}${secondNumber}`;

        // Check if the calculation is unique
        if (!seenCalculations.has(calculationKey)) {
            seenCalculations.add(calculationKey); // Mark the calculation as seen
            calculations.push({
                firstNumber,
                secondNumber,
                operator,
                resultNumber: result,
            });
        }
    }

    return calculations;
};

export const isPositiveInteger = (value: number | string) => {
    return Number.isInteger(value) && value > 0;
}