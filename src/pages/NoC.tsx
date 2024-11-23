import React, {useEffect, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {isPositiveInteger} from "../utils";

interface Props {
    onSubmit: (value: number) => void;
    onError: (error: string) => void;
}

const NoC = ({onSubmit, onError}: Props) => {
    const [value, setValue] = useState<string | number>("0");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        //reset value on page change
        onSubmit(0);
    }, []);

    useEffect(() => {
        //validations
        const numVal = Number(value);

        if (!isPositiveInteger(numVal)) {
            setError("Value has to be positive integer")
        } else if (!(20 <= numVal && numVal <= 60)) {
            setError("Value has to be between 20 and 60")
        } else {
            setError("");
        }
        onError(error);
    }, [value]);

    return (
        <Stack
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h3">NoC</Typography>
            <TextField
                id="operationNumber"
                label="Number of operations"
                variant="outlined"
                helperText={error}
                value={value}
                error={Boolean(error.length)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(event.target.value);}}
            />
            <Button
                variant="contained"
                disabled={Boolean(error.length)}
                onClick={() => onSubmit(Number(value))}
            >START</Button>
        </Stack>
    );
}

export default NoC;