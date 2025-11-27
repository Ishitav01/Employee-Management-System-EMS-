import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState({
        message: "",
        severity: "success",
    });

    const showSnackbar = (message, severity) => {
        setSnack({ message, severity });
        setOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity={snack.severity} variant="filled" onClose={() => setOpen(false)}>
                    {snack.message}
                </Alert>
            </Snackbar>

        </SnackbarContext.Provider>
    );
};