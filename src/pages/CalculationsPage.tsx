import React, {useEffect, useState} from "react";
import {ICalculation} from "../types";
import {generateCalculations} from "../utils";
import CalculationCard from "../components/CalculationCard";
import Grid from '@mui/material/Grid2';
import {Alert, Snackbar, Stack} from "@mui/material";
import Timer from "../components/Timer";

interface Props {
    numberOfCalculations: number;
}

interface IToast {
    message: string;
    severity: "success" | "error";
}

const CalculationsPage = ({numberOfCalculations}: Props) => {
    const [calculations, setCalculations] = useState<ICalculation[]>([]);
    const [calcResults, setCalcResults] = useState<boolean[]>([]);
    const [editable, setEditable] = useState<boolean>(true); // calculations are editable
    const [toast, setToast] = useState<IToast | undefined>();

    useEffect(() => {
        // create calculations
        setCalculations(generateCalculations(numberOfCalculations));
    }, [numberOfCalculations]);
    
    const renderCalculations = () => {
        return calculations.map((calculation) =>
            <CalculationCard
                calculation={calculation}
                isCorrect={(res: boolean) => {
                    setCalcResults([...calcResults, res])
                }}
                editable={editable}
            />)
    }

    // checking number of results - if all, show success toast
    useEffect(() => {
        if (calcResults.length === numberOfCalculations) {
            const successRate = Math.round((calcResults.filter(cr => cr).length/numberOfCalculations)*100);
            setToast({
                message: `All calculations are done! Your success rate is ${successRate}%`,
                severity: "success",
            });
        }
    }, [calcResults]);

    const timerRunOut = () => {
        setEditable(false);
        const calculated = calcResults.length;

        setToast({
            message: `You run out of time! You have calculated ${calculated} of ${numberOfCalculations} calculations.`,
            severity: "error",
        });
    }

    return (
        <Stack direction="column" sx={{justifyContent: "space-between"}}>
            <Grid container spacing={2}>
                {renderCalculations()}
            </Grid>

            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                p={1}
            >
                <span>Finished: {calcResults.length}/{numberOfCalculations}</span>
                <Timer
                    noc={numberOfCalculations}
                    stopCount={calcResults.length === numberOfCalculations}
                    runOut={timerRunOut}
                />
            </Stack>

            <Snackbar
                open={Boolean(toast)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            ><Alert
                severity={toast?.severity}
                variant="filled"
                sx={{ width: '100%' }}
                onClose={() => setToast(undefined)}
            >
                {toast?.message}
            </Alert>
            </Snackbar>

        </Stack>
    )
}

export default CalculationsPage;