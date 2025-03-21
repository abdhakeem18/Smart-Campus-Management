import React, { useState } from "react";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

const EventDialog = ({ selectedEvent, setSelectedEvent }) => {
    const handleClose = () => {
        setSelectedEvent(null);
    };

    return (
        <Dialog open={Boolean(selectedEvent)} onClose={handleClose}>
            <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
                Event Details
            </DialogTitle>
            <DialogContent sx={{ padding: "20px" }}>
                {selectedEvent && (
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {selectedEvent.title}
                    </Typography>
                )}
                {selectedEvent && (
                    <Typography>
                        📅 <strong>Start:</strong>{" "}
                        {selectedEvent.start.toLocaleString()} <br />
                        🕒 <strong>End:</strong>{" "}
                        {selectedEvent.end.toLocaleString()}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EventDialog;
