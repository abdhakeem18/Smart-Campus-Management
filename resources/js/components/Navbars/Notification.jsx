import React, { useContext, useEffect, useState } from "react";
import {
    Badge,
    IconButton,
    Popover,
    Typography,
    Box,
    Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AlertDialog from "../dialog/AlertDialogComponent";
import API from "@/config/Api";
import AppContext from "@/config/AppContext";

const AppointmentNotifications = () => {
    const [contextData, setContextData] = useContext(AppContext);
    const [alertOptions, setAlertOptions] = useState({
        open: false,
        data: {},
        type: "delete",
    });
    const [appointments, setAppointments] = useState([
        { id: 1, title: "Scholarship Applications Now Open", isRead: false },
    ]);

    const [anchorEl, setAnchorEl] = useState(null);
    const role = contextData?.roles[contextData?.userDetails?.role_id];
    const { apiCall, error } = API(role);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMarkAsRead = (id) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === id
                    ? { ...appointment, isRead: true }
                    : appointment,
            ),
        );
    };

    const unreadAppointments = appointments.filter(
        (appointment) => !appointment.isRead,
    );

    const fetchNotifications = async () => {
        const response = await apiCall("/messages");

        console.log(response);
    };

    useEffect(() => {
        if (role) {
            fetchNotifications();
        }
    }, [role]);

    return (
        <div>
            {/* Notification Icon */}
            <IconButton onClick={handleClick}>
                <Badge badgeContent={unreadAppointments.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            {/* Popover for Notifications */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        maxHeight: "400px",
                        overflowY: "auto",
                        width: "100%",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Notifications
                    </Typography>

                    {appointments.length === 0 ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: "center" }}
                        >
                            No new notifications
                        </Typography>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {appointments.map((appointment) => (
                                <Box
                                    key={appointment.id}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        p: 1.5,
                                        borderRadius: 2,
                                        backgroundColor: appointment.isRead
                                            ? "#fff"
                                            : "#e3f2fd",
                                        boxShadow: 1,
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                            backgroundColor: "#bbdefb",
                                        },
                                    }}
                                    onClick={() =>
                                        setAlertOptions({
                                            open: true,
                                            data: appointment,
                                            type: "accept",
                                        })
                                    }
                                >
                                    <Badge
                                        color="primary"
                                        variant={
                                            appointment.isRead
                                                ? "standard"
                                                : "dot"
                                        }
                                        overlap="circular"
                                    >
                                        <Avatar
                                            sx={{
                                                width: 45,
                                                height: 45,
                                                mr: 2,
                                            }}
                                        >N</Avatar>
                                    </Badge>

                                    {/* Message Content */}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: appointment.isRead
                                                    ? "normal"
                                                    : "bold",
                                            }}
                                        >
                                            {appointment.title}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {new Date(
                                                appointment.timestamp,
                                            ).toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </Popover>

            {alertOptions.open && (
                <AlertDialog
                    title={"Announcement"}
                    open={alertOptions.open}
                    desc="Scholarship Applications Now Open We are pleased to announce that applications for the 2025 Academic Scholarships are now open! This is a fantastic opportunity for eligible students to receive financial assistance for their studies."
                    data={alertOptions.data}
                    type={`${alertOptions.type}`}
                    closeDialog={() =>
                        setAlertOptions({ open: false, data: {} })
                    }
                    handleConfirm={(value) => {
                        setAlertOptions({ open: false, data: {} });
                    }}
                />
            )}
        </div>
    );
};

export default AppointmentNotifications;
