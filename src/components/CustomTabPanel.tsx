import React from "react";
import {Box} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    style?: React.CSSProperties;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const {children, value, index, style, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={style}
            {...other}
        >
            {value === index &&
                <Box
                    display="flex"
                    height="90vh"
                    justifyContent="center"
                    sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

export default CustomTabPanel;