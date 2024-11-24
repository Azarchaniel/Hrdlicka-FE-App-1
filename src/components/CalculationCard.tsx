import {Card, Stack, TextField, Tooltip, Typography} from "@mui/material";
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
        outline: "2px solid green",
        backgroundColor: "lightgreen",
        border: "1px solid transparent", //1 px - so the size is kept same; transparent - not interfering with outline color
    } as const;
    const ERROR_STYLE = {
        outline: "2px solid red",
        backgroundColor: "#FFCCCB",
        border: "1px solid transparent",
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
            className="calc-card"
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
                <Tooltip title="Confirm with Enter">
                    <TextField
                        id="result"
                        data-testid="result"
                        inputProps={{ "data-testid": "result-input" }}
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
                </Tooltip>
            </Stack>
        </Card>)
}

export default CalculationCard;