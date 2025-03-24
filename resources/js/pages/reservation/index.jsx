import React, { useEffect, useState, useContext } from "react";
import PageLayout from "@/layouts/Page";
import { Paper } from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import API from "@/config/api";
import ModalComponent from "@/components/modals/Modal";
import UpdateReservation from "./components/EditForm";
import ViewReservation from "./components/ViewForm";
import AppContext from "@/config/AppContext";

const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "title", label: "Name", minWidth: 100 },
    { id: "courseDetails", label: "Course", minWidth: 100 },
    { id: "start", label: "Start Date", minWidth: 100 },
    { id: "end", label: "End Date", minWidth: 100 },
    { id: "status", label: "status", minWidth: 100 },
    { id: "action", label: "Action", maxWidth: 100, align: "right" },
];

const Reservation = () => {
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

    const resetModalOptions = () => {
        setSuccess(null);
        setModalOptions({
            open: false,
            title: "",
            data: {},
            formName: "",
        });
    };

    const [reservations, setReservations] = useState([]);
    const [success, setSuccess] = useState(null);
    const [udateReservationTable, setUpdateReservationTable] = useState(true);
    const role = contextData?.roles[contextData?.userDetails?.role_id];
    const { apiCall, loading, error } = API(role);

    async function fetchReservations() {
        let response = await apiCall("/schedules");

        if (response?.success) {
            let eventsList = [];

            (response?.data).map((value, index) => {
                if (value.type === 1) {
                    eventsList.push({
                        ...value,
                        id: value.id,
                        title: value.title,
                        courseDetails: `${value.course.course_name}(${value.subject.subject_name})`,
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

            setReservations(eventsList);
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
        if (udateReservationTable, role) {
            fetchReservations();

            setUpdateReservationTable(false);

            return () => {
                fetchReservations();
            };
        }
    }, [udateReservationTable, role]);

    async function handleAction(action, selectedRow) {
        if (action === "Edit") {
            if (selectedRow?.status != "Completed") {
                showModal(
                    "Update Reservation",
                    selectedRow,
                    "update-reservation",
                );
            } else {
                alert("You cannot edit events that have already ended.");
            }
        }
        if (action === "View") {
            showModal("", selectedRow, "reservation-view");
        }
    }

    const onApprove = async (id, type) => {
        setSuccess("");
        if(type === 1) {
            const response = await apiCall(`/schecdule/approval/${id}`, "PUT", {});

        if (response?.success) {
            setSuccess(response?.message);

            setUpdateReservationTable(true);

            setTimeout(() => {
                resetModalOptions();
            }, 3000);
        }
        }
    };

    return (
        <PageLayout title={"Reservations"}>
            <Paper
                className="user-table border-4"
                sx={{ width: "100%", overflow: "hidden", boxShadow: 0 }}
            >
                <CommonTable
                    columns={columns}
                    rows={reservations}
                    handleAction={handleAction}
                    tableType="reservation"
                    extMenuItems={["View"]}
                ></CommonTable>
            </Paper>

            <ModalComponent
                formTitle={modalOptions.title}
                open={modalOptions.open}
                closeModal={resetModalOptions}
            >
                {modalOptions.formName === "update-reservation" ? (
                    <UpdateReservation
                        data={modalOptions.data}
                        closeModal={resetModalOptions}
                        btnLabel={"Update"}
                        updateReservationTable={setUpdateReservationTable}
                    />
                ) : null}

                {modalOptions.formName === "reservation-view" ? (
                    <ViewReservation
                        data={modalOptions.data}
                        onApprove={onApprove}
                        loading={loading}
                        success={success}
                        error={error}
                    />
                ) : null}
            </ModalComponent>
        </PageLayout>
    );
};

export default Reservation;
