import {Card, Stack, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ICalculation} from "../types";

interface Props {
    calculation: ICalculation;
    isCorrect: (res: boolean) => void;
}

const CalculationCard = ({calculation, isCorrect}: Props) => {
    const DEFAULT_STYLE = {} as const;
    const CORRECT_STYLE = {
        border: "2px solid green",
        backgroundColor: "lightgreen",
    } as const;
    const ERROR_STYLE = {
        border: "2px solid red",
        backgroundColor: "#FFCCCB",
    } as const;

    const [result, setResult] = useState<number>();
    const [correct, setCorrect] = useState<boolean>();
    const [cardStyle, setCardStyle] = useState<Object>(DEFAULT_STYLE);


    useEffect(() => {
        //FIXME: not useEffect, but onSubmit
        if (!result) return;
        setCorrect(result === calculation.resultNumber);
    }, [result]);

    useEffect(() => {
        if (!result) return;
        isCorrect(!!correct);
        console.log(correct, result);
        setCardStyle(correct ? CORRECT_STYLE : ERROR_STYLE);
    }, [correct]);

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
                <TextField
                    id="result"
                    style={{width: "3rem"}}
                    label=""
                    variant="outlined"
                    value={result}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setResult(Number(event.target.value));}}
                />
            </Stack>
        </Card>)
}

export default CalculationCard;