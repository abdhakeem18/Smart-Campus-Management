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
                        {selectedEvent?.start
                            ? new Date(selectedEvent.start).toLocaleString()
                            : "N/A"}
                        <br />
                        🕒 <strong>End:</strong>{" "}
                        {selectedEvent?.end
                            ? new Date(selectedEvent.end).toLocaleString()
                            : "N/A"}
                    </Typography>
                )}

                {selectedEvent &&
                    console.log(" => ", selectedEvent.end)}
                {selectedEvent &&
                    console.log("Type of Start:", typeof selectedEvent.end)}
            </DialogContent>
        </Dialog>
    );
};

export default EventDialog;
