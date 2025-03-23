import React, { useState, useEffect, useContext } from "react";
import PageLayout from "@/layouts/Page";
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
    const [updateCalendar, setUpdateCalender] = useState(true);

    async function fetchEvents() {
        let response = await apiCall("/schedules");
        if (response?.success) {
            let eventsList = [];

            (response?.data).map((value, index) => {
                eventsList.push({
                    id: value.id,
                    title: value.title,
                    type: (value.type === 1 ? "Reservation" : value.type === 2 ? "Event" : "Equipment"),
                    start: new Date(((value.date).split(" ")[0]) + "T" + value.start_time),
                    end: new Date(((value.date).split(" ")[0]) + "T" + value.end_time),
                    color: (value.type === 1 ? "#06524c" : value.type === 2 ? "#072d4a" : "#000"),
                });
            });

            setEvents(eventsList);
        }
    }

    useEffect(() => {
        if(updateCalendar && role) {
            fetchEvents();
            setUpdateCalender(false);
        }
    }, [updateCalendar, role]);

    return (
        <PageLayout title={"Schedule"}>
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
                setUpdateCalender={setUpdateCalender}
            />
        </PageLayout>
    );
}
