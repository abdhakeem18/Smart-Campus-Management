import React, { useState, useEffect } from "react";
import AdminLayout from "@/layouts/Admin";
import FullCalendarView from "@/components/FullCalendar";
import EventDialog from "./components/EventDialog";
import BasicModal from "./components/BasicModal";

export default function SchedulePage() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectDate, setSelectedDate] = useState(null);

    return (
        <AdminLayout>
            <FullCalendarView setSelectedEvent={setSelectedEvent} setOpen={setOpen} setSelectedDate={setSelectedDate}/>

            <EventDialog
                setSelectedEvent={setSelectedEvent}
                selectedEvent={selectedEvent}
            />

            <BasicModal open={open} setOpen={setOpen} selectDate={selectDate}/>
        </AdminLayout>
    );
}
