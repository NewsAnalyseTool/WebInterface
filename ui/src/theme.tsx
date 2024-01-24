import { createTheme } from "@mui/material";


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3EA1DA',
        },
        secondary: {
            main: '#06151e',
        },
        background: {
            default: '#010304',
            paper: '#010304',
        },
        info: {
            main: '#268ec9',
        },
        text: {
            primary: '#e5f2fa',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;