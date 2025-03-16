import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Card, CardContent } from "@mui/material";

const FullCalendarView = ({setSelectedEvent}) => {

    const handleEvent = (info) => {
        setSelectedEvent(info.event);
    };

    const handleDate = (info) => {
        console.log("info => ", info);
        // setEvents();
    };

    const [events, setEvents] = useState([
        {
            id: "1",
            title: "Math Class",
            start: "2025-03-15T10:00:00",
            end: "2025-03-15T12:00:00",
            color: "#4caf50",
        },
        {
            id: "2",
            title: "Physics Lab",
            start: "2025-03-16T14:00:00",
            end: "2025-03-16T16:00:00",
            color: "#2196f3",
        },
        {
            id: "3",
            title: "Basketball Practice",
            start: "2025-03-17T16:00:00",
            end: "2025-03-17T18:00:00",
            color: "#ff9800",
        },
        {
            id: "4",
            title: "Basketball Practice2",
            start: "2025-03-17T16:00:00",
            end: "2025-03-20T18:00:00",
            color: "#ff9800",
        },
        {
            id: "4",
            title: "Basketball Practice2",
            start: "2025-03-17T16:00:00",
            end: "2025-03-17T18:00:00",
            color: "#ff9800",
        },
        {
            id: "4",
            title: "Basketball Practice2",
            start: "2025-03-17T16:00:00",
            end: "2025-03-17T18:00:00",
            color: "#ff9800",
        },
        {
            id: "4",
            title: "Basketball Practice2",
            start: "2025-03-17T16:00:00",
            end: "2025-03-17T18:00:00",
            color: "#ff9800",
        },
    ]);

    return (
        <>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent className="schedule-calender">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth",
                        }}
                        events={events}
                        eventClick={handleEvent}
                        dateClick={handleDate}
                        dayMaxEventRows={3}
                        eventContent={(eventInfo) => (
                            <div
                                style={{
                                    padding: "4px",
                                    borderRadius: "4px",
                                    backgroundColor:
                                        eventInfo.event.backgroundColor,
                                    color: "#fff",
                                }}
                            >
                                <strong>{eventInfo.event.title}</strong> <br />
                                <small>
                                    {eventInfo.event.start.toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        },
                                    )}
                                </small>
                            </div>
                        )}
                        dayCellContent={(day) => (
                            <span
                                style={{
                                    fontWeight: "bold",
                                    color: "#333",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                }}
                            >
                                {day.date.getDate()}
                            </span>
                        )}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default FullCalendarView;
