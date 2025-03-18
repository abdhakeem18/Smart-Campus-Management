import React, { useState, useEffect } from "react";
import AdminLayout from "@/layouts/Admin";
import FullCalendarView from "@/components/FullCalendar";
import EventDialog from "@/components/dialog/EventDialog";
import BasicModal from "@/components/modals/BasicModal";

export default function SchedulePage() {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <AdminLayout>
            <FullCalendarView setSelectedEvent={setSelectedEvent} />

            <EventDialog
                setSelectedEvent={setSelectedEvent}
                selectedEvent={selectedEvent}
            />

            <BasicModal />
        </AdminLayout>
    );
}
