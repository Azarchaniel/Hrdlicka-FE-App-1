import {Card, Stack, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {ICalculation} from "../types";

interface Props {
    calculation: ICalculation;
    isCorrect: (res: boolean) => void;
    editable: boolean;
}

const CalculationCard = ({calculation, isCorrect, editable}: Props) => {
    const DEFAULT_STYLE = {} as const;
    const CORRECT_STYLE = {
        border: "2px solid green",
        backgroundColor: "lightgreen",
    } as const;
    const ERROR_STYLE = {
        border: "2px solid red",
        backgroundColor: "#FFCCCB",
    } as const;

    const [cardStyle, setCardStyle] = useState<Object>(DEFAULT_STYLE);

    const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //@ts-ignore
        const checkCalculation = Number(e.target?.value) === calculation.resultNumber;

        isCorrect(checkCalculation);
        setCardStyle(checkCalculation ? CORRECT_STYLE : ERROR_STYLE);
    }

    return (
        <Card
            variant="outlined"
            style={cardStyle}
        >
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                p={2}
            >
                <Typography variant="h6">
                    {calculation.firstNumber}
                </Typography>
                <Typography variant="h6">
                    {calculation.operator === "*" ? "×" : calculation.operator}
                </Typography>
                <Typography variant="h6">
                    {calculation.secondNumber}
                </Typography>
                <Typography variant="h6">
                    =
                </Typography>
                {/* disabled - if the style is not empty or if it is editable, do not disable */}
                <TextField
                    id="result"
                    style={{width: "3rem"}}
                    label=""
                    variant="outlined"
                    disabled={Boolean(Object.keys(cardStyle)?.length) || !editable}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        //@ts-ignore
                        if (e.key === 'Enter' && e.target.value) {
                            e.preventDefault();
                            onSubmit(e)
                        }
                    }}
                />
            </Stack>
        </Card>)
}

export default CalculationCard;