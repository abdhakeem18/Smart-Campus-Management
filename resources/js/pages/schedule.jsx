import React, { useState, useEffect } from "react";
import AdminLayout from "@/layouts/Admin";

import { Container, Box } from "@mui/material";
import FullCalendarView from "../components/FullCalendar";
import EventDialog from "../components/dialog/EventDialog";
import BasicModal from "../components/modals/BasicModal";

export default function SchedulePage() {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <AdminLayout>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* <DrawerHeader /> */}
                <div className="min-height-300 bg-primary-cu position-absolute w-100 position-top-left"></div>
                <Container sx={{ mt: 4, mb: 4 }} className="calender-container">
                    <FullCalendarView setSelectedEvent={setSelectedEvent} />

                    <EventDialog
                        setSelectedEvent={setSelectedEvent}
                        selectedEvent={selectedEvent}
                    />

                    <BasicModal />
                </Container>
            </Box>
        </AdminLayout>
    );
}
