import React, {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import CustomTabPanel from "../components/CustomTabPanel";
import NoC from "./NoC";
import Calculations from "./Calculations";

const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [numberOfOperations, setNumberOfOperations] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.SyntheticEvent, newTab: number): void => {
        setActiveTab(newTab);
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Home" />
                    <Tab label="Calculations" disabled={!Boolean(error.length)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={activeTab} index={0}>
                <NoC onSubmit={setNumberOfOperations} onError={setError} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                <Calculations numberOfCalculations={numberOfOperations} />
            </CustomTabPanel>
        </>
    )
}

export default Home;