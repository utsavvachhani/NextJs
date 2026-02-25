"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { hideAlert } from "@/action/alertSlice";
import { Snackbar, Alert, Box } from "@mui/material";

const CustomAlert: React.FC = () => {
    const dispatch = useDispatch();
    const { message, type, visible } = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideAlert());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [visible, dispatch]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(hideAlert());
    };

    return (
        <Snackbar
            open={visible}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                variant="filled"
                sx={{
                    width: "100%",
                    boxShadow: "var(--shadow-lg)",
                    borderRadius: "12px",
                    fontWeight: 600,
                    backgroundColor:
                        type === "success"
                            ? "var(--brand-red)" // Custom branding for success if desired, or default
                            : undefined,
                    "&.MuiAlert-filledSuccess": {
                        backgroundColor: "#10b981", // Emerald 500
                    },
                    "&.MuiAlert-filledError": {
                        backgroundColor: "#ef4444", // Red 500
                    },
                    "&.MuiAlert-filledInfo": {
                        backgroundColor: "#3b82f6", // Blue 500
                    },
                    "&.MuiAlert-filledWarning": {
                        backgroundColor: "#f59e0b", // Amber 500
                    },
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
