import React, { useState, useContext, useEffect } from "react";
import PageLayout from "@/layouts/Page";
import ModalComponent from "@/components/modals/Modal";
import AttendanceTrack from "./components/AddFrom";
import { Button, Paper } from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import AppContext from "@/config/AppContext";
import API from "@/config/Api";

const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "course", label: "Course", minWidth: 100 },
    { id: "subject", label: "Subject", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
    {
        id: "percentage",
        label: "Attendance Percentage",
        minWidth: 100,
    },
    { id: "action", label: "Action", maxWidth: 100, align: "right" },
];

export default function AttendancePage() {
    const [contextData, setContextData] = useContext(AppContext);
    const [modalOptions, setModalOptions] = useState({
        open: false,
        title: "",
        data: {},
        formName: "",
    });
    const [success, setSuccess] = useState(null);
    const [listAttendance, setListAttendance] = useState([]);
    const [udateAttendanceTable, setUdateAttendanceTable] = useState(true);
    const role = contextData?.roles[contextData?.userDetails?.role_id];
    const { apiCall, loading, error } = API(role);

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
    const handleAttendance = (values, attendance) => {
        const dataList = {
            id: values?.course,
            course: values?.course,
            subject: values?.subject,
            date: new Date(values?.date).toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
            percentage: attendance + "%",
        };
        setListAttendance((prevState) => [...prevState, dataList]);
    };

    const fetchAttendances = async () => {
        let response = await apiCall("/attendance");

        if (response?.success) {
            // let dataList = [];
            // (response?.data).map((value, index) => {
            //     dataList.push({
            //         id: value?.course,
            //         course: value?.course,
            //         subject: value?.subject,
            //         date: new Date(value?.date).toLocaleString([], {
            //             year: "numeric",
            //             month: "2-digit",
            //             day: "2-digit",
            //         }),
            //         percentage: attendance + "%",
            //     });
            // });

            // setListAttendance(dataList);
        }
    };

    // useEffect(() => {
    //     if ((udateAttendanceTable, role)) {
    //         fetchAttendances();

    //         setUpdateAttendanceTable(false);

    //         return () => {
    //             fetchAttendances();
    //         };
    //     }
    // }, [udateAttendanceTable, role]);

    const handleAction = () => {};

    return (
        <PageLayout title={"Attendance"}>
            <Paper
                className="user-table border-4"
                sx={{ width: "100%", overflow: "hidden", boxShadow: 0 }}
            >
                <div className="m-3 text-end">
                    <Button
                        variant="contained"
                        onClick={() =>
                            showModal("Add Attendance", {}, "Add-attendance")
                        }
                    >
                        Add Attendance
                    </Button>
                </div>
                <CommonTable
                    columns={columns}
                    rows={listAttendance}
                    handleAction={handleAction}
                ></CommonTable>
            </Paper>
            <ModalComponent
                formTitle={modalOptions.title}
                open={modalOptions.open}
                closeModal={resetModalOptions}
            >
                <AttendanceTrack
                    closeModal={resetModalOptions}
                    handleAttendance={handleAttendance}
                />
            </ModalComponent>
        </PageLayout>
    );
}
