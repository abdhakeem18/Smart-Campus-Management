import React, { useEffect, useState, useContext } from "react";
import PageLayout from "@/layouts/Page";
import { Paper, Typography } from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import API from "@/config/api";
import ModalComponent from "@/components/modals/Modal";
import UpdateEvent from "./components/EditForm";
import ViewEvent from "./components/ViewForm";
import AlertDialog from "@/components/dialog/AlertDialogComponent";
import AppContext from "@/config/AppContext";

const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "title", label: "Name", minWidth: 100 },
    { id: "location", label: "Location", minWidth: 100 },
    { id: "start", label: "Start Date", minWidth: 100 },
    { id: "end", label: "End Date", minWidth: 100 },
    { id: "status", label: "status", minWidth: 100 },
    { id: "action", label: "Action", maxWidth: 100, align: "right" },
];

const EventPage = () => {
    const [contextData, setContextData] = useContext(AppContext);
    const [modalOptions, setModalOptions] = useState({
        open: false,
        title: "",
        data: {},
        formName: "",
    });
    const showModal = (title, data, formName) => {
        setModalOptions({
            open: true,
            title,
            data,
            formName,
        });
    };
    const [alertOptions, setAlertOptions] = useState({
        open: false,
        data: {},
        type: "notification",
    });
    const resetModalOptions = () => {
        setSuccess(null);
        setModalOptions({
            open: false,
            title: "",
            data: {},
            formName: "",
        });
    };

    const [events, setEvents] = useState([]);
    const [success, setSuccess] = useState(null);
    const [udateEventTable, setUpdateEventTable] = useState(true);
    const role = contextData?.roles[contextData?.userDetails?.role_id];
    const { apiCall, loading, error } = API(role);

    async function fetchEvents() {
        let response = await apiCall("/schedules");

        if (response?.success) {
            let eventsList = [];
            (response?.data).map((value, index) => {
                if (value.type === 2) {
                    eventsList.push({
                        ...value,
                        id: value.id,
                        title: value.title,
                        location: value?.location,
                        start: dateFormat(
                            value.date.split(" ")[0] + "T" + value.start_time,
                        ),
                        end: dateFormat(
                            value.date.split(" ")[0] + "T" + value.end_time,
                        ),
                        status:
                            value.status === 1
                                ? new Date(
                                      value.date.split(" ")[0] +
                                          "T" +
                                          value.end_time,
                                  ) > new Date()
                                    ? "Accepted"
                                    : "Completed"
                                : "Pending",
                    });
                }
            });

            setEvents(eventsList);
        }
    }

    function dateFormat(date) {
        return (
            <>
                {new Date(date)
                    .toLocaleString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })
                    .split(", ")
                    .map((part, i) => (
                        <React.Fragment key={i}>
                            {part} <br />
                        </React.Fragment>
                    ))}
            </>
        );
    }

    useEffect(() => {
        if (udateEventTable && role) {
            fetchEvents();

            setUpdateEventTable(false);

            return () => {
                fetchEvents();
            };
        }
    }, [udateEventTable, role]);

    async function handleAction(action, selectedRow) {
        if (action === "Edit") {
            if (selectedRow?.status != "Completed") {
                showModal("Update Event", selectedRow, "update-Event");
            } else {
                setAlertOptions({
                    open: true,
                });
            }
        }
        if (action === "View") {
            showModal("", selectedRow, "event-view");
        }
    }

    const onApprove = async (id, type) => {
        setSuccess("");
        if (type === 1) {
            const response = await apiCall(
                `/schecdule/approval/${id}`,
                "PUT",
                {},
            );

            if (response?.success) {
                setSuccess(response?.message);

                setUpdateEventTable(true);

                setTimeout(() => {
                    resetModalOptions();
                }, 3000);
            }
        }
    };

    return (
        <PageLayout title={"Events"}>
            <Paper
                className="user-table border-4"
                sx={{ width: "100%", overflow: "hidden", boxShadow: 0 }}
            >
                <CommonTable
                    columns={columns}
                    rows={events}
                    handleAction={handleAction}
                    tableType="event"
                    extMenuItems={["View"]}
                ></CommonTable>
            </Paper>

            <ModalComponent
                formTitle={modalOptions.title}
                open={modalOptions.open}
                closeModal={resetModalOptions}
            >
                {modalOptions.formName === "update-event" ? (
                    <UpdateEvent
                        data={modalOptions.data}
                        closeModal={resetModalOptions}
                        btnLabel={"Update"}
                        updateEventTable={setUpdateEventTable}
                    />
                ) : null}

                {modalOptions.formName === "event-view" ? (
                    <ViewEvent
                        data={modalOptions.data}
                        onApprove={onApprove}
                        loading={loading}
                        success={success}
                        error={error}
                    />
                ) : null}
            </ModalComponent>

            {alertOptions.open && (
                <AlertDialog
                    title={""}
                    open={alertOptions.open}
                    desc={
                        <>
                            <Typography
                                variant="body1"
                                component={"div"}
                                sx={{
                                    color: "red",
                                }}
                            >
                                You cannot edit events that have already ended.
                            </Typography>
                        </>
                    }
                    data={alertOptions.data}
                    type={`${alertOptions.type}`}
                    closeDialog={() =>
                        setAlertOptions({ open: false, data: {} })
                    }
                />
            )}
        </PageLayout>
    );
};

export default EventPage;
