import {useEffect, useState} from "react";
import {ICalculation} from "../types";
import {generateCalculations} from "../utils";
import CalculationCard from "../components/CalculationCard";
import Grid from '@mui/material/Grid2';

interface Props {
    numberOfCalculations: number;
}

const Calculations = ({numberOfCalculations}: Props) => {
    const [calculations, setCalculations] = useState<ICalculation[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean>();

    useEffect(() => {
        setCalculations(generateCalculations(numberOfCalculations));
        console.log(calculations);
    }, [numberOfCalculations]);
    
    const renderCalculations = () => {
        return calculations.map((calculation) =>
            <CalculationCard calculation={calculation} isCorrect={setIsCorrect} />)
    }

    return (<Grid container spacing={2}>{renderCalculations()}</Grid>)
}

export default Calculations;