import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "@/layouts/Admin";
import FullCalendarView from "@/components/FullCalendar";
import EventDialog from "./components/EventDialog";
import EventModal from "./components/EventModal";
import AppContext from "@/config/AppContext";
import API from "@/config/Api";

export default function SchedulePage() {
    const [contextData, setContextData] = useContext(AppContext);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectDate, setSelectedDate] = useState(null);
    const [success, setSuccess] = useState("");
    const role = contextData?.roles[contextData?.userDetails?.role_id];
    const { apiCall, error } = API(role);
    const [events, setEvents] = useState([]);

    async function getEvents() {
        let response = await apiCall("/schedules");

        console.log(response);
        if (response?.success) {
            let eventsList = [];

            (response?.data).map((value, index) => {
                eventsList.push({
                    id: value.id,
                    title: value.title,
                    start: new Date(((value.date).split(" ")[0]) + "T" + value.start_time),
                    end: new Date(((value.date).split(" ")[0]) + "T" + value.end_time),
                    color: "#ff9800",
                });
            });

            setEvents(eventsList);
        }
    }

    useEffect(() => {
        if(events) {
            getEvents();
        }
    }, [role]);

    return (
        <AdminLayout>
            <FullCalendarView
                setSelectedEvent={setSelectedEvent}
                setOpenModal={setOpenModal}
                setSelectedDate={setSelectedDate}
                events={events}
            />

            <EventDialog
                setSelectedEvent={setSelectedEvent}
                selectedEvent={selectedEvent}
            />

            <EventModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                selectDate={selectDate}
                role={role}
            />
        </AdminLayout>
    );
}
