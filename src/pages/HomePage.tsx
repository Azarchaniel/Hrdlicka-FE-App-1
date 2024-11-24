import React, {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import CustomTabPanel from "../components/CustomTabPanel";
import NoCPage from "./NoCPage";
import CalculationsPage from "./CalculationsPage";

const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [numberOfCalculations, setNumberOfCalculations] = useState<number>(0);

    const handleChange = (_: React.SyntheticEvent, newTab: number): void => {
        setActiveTab(newTab);
    }

    const onSubmitNoC = (noc: number) => {
        if (!noc) return;
        setNumberOfCalculations(noc);
        setActiveTab(1);
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Home" />
                    <Tab label="Calculations" disabled={activeTab !== 1} aria-disabled={activeTab !== 1}/>
                </Tabs>
            </Box>

            <CustomTabPanel value={activeTab} index={0}>
                <NoCPage onSubmit={onSubmitNoC} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                <CalculationsPage numberOfCalculations={numberOfCalculations} />
            </CustomTabPanel>
        </>
    )
}

export default HomePage;