import React, {useState, useEffect} from 'react';
import TimerIcon from '@mui/icons-material/TimerOutlined';
import {Stack} from "@mui/material";

interface Props {
    noc: number; //number of calculations
    stopCount: boolean;
    runOut: () => void;
}

const SECONDS_PER_ONE_CALCULATION = 5;

const Timer = ({noc, stopCount, runOut}: Props) => {
    const [time, setTime] = useState(1); // Time in seconds
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setTime((noc * SECONDS_PER_ONE_CALCULATION) - 1);
    }, [noc]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (stopCount) setIsActive(false);

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0 || stopCount) {
            setIsActive(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time, stopCount]);

    useEffect(() => {
        if (time === 0) runOut();
    }, [isActive]);

    return (
        <Stack
            spacing={1}
            direction="row"
            sx={{
                alignItems: "center",
            }}
        >
            <span>{time}s</span>
            <TimerIcon/>
        </Stack>
    );
};

export default Timer;
