import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent } from "@mui/material";

const FullCalendarView = ({
    setSelectedEvent,
    setOpenModal,
    setSelectedDate,
    events
}) => {

    const handleEvent = (info) => {
        setSelectedEvent(info.event);
    };

    const handleDate = (info) => {
        setSelectedDate(info.dateStr);
        setOpenModal(true);
    };

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
                        dateClick={(info) => {
                            if (info.date < new Date().setHours(0, 0, 0, 0)) {
                                return;
                            }
                            handleDate(info);
                        }}
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
                                <strong>Title: {eventInfo.event.title}</strong> <br />
                                <p>Type: {eventInfo.event.extendedProps.type}</p>
                                <small>
                                    {/* {console.log('eventInfo.event.start => ', eventInfo.event.start, "---", eventInfo.event.end)} */}
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
