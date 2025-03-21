import React, { useEffect, useState } from "react";
import AdminLayout from "@/layouts/Admin";
import {
    Button,
    Paper,
} from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import API from "@/config/api";
import ModalComponent from "@/components/modals/Modal";
import CourseAddForm from "./components/AddForm";
import CourseEditForm from "./components/EditForm";

const columns = [
    { id: "course_code", label: "ID", minWidth: 100 },
    { id: "course_name", label: "Name", minWidth: 100 },
    { id: "start_date", label: "Start Date", minWidth: 100 },
    { id: "end_date", label: "End Date", minWidth: 100 },
    { id: "action", label: "Action", maxWidth: 100, align: "right" },
];

const Courses = () => {
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
        setModalOptions({
            open: false,
            title: "",
            data: {},
            formName: "",
        });
    };

    const [courses, setCourses] = useState([]);
    const [updateCourseTable, setUpdateCourseTable] = useState(true);
    const { apiCall, loading, apiError } = API("admin");

    async function fetchCourses() {
        const response = await apiCall("/courses");

        if (response?.success) {
            let courseList = [];
            (response?.data).map((course) => {
                courseList.push({
                    course_code: course?.course_code,
                    course_name: course?.course_name,
                    start_date: course?.start_date,
                    end_date: course?.end_date,
                });
            });
            console.log(courseList);

            setCourses(courseList);
        }
    }

    useEffect(() => {
        if (updateCourseTable) {
            fetchCourses();

            setUpdateCourseTable(false);

            return () => {
                fetchCourses();
            };
        }
    }, [updateCourseTable]);

    async function handleAction(action, selectedRow) {
        if (action === "Edit" || action === "View") {
            const response = await apiCall(`/users/${selectedRow.id}`);

            if (response?.success) {
                if (action === "Edit")
                    showModal("Update New User", response?.data, "update-user");
                else showModal("User Details", response?.data, "user-details");
            }
        }
    }

    return (
        <AdminLayout title={"Courses"}>
            <Paper
                className="user-table border-4"
                sx={{ width: "100%", overflow: "hidden", boxShadow: 0 }}
            >
                <div className="m-3 text-end">
                    <Button
                        variant="contained"
                        onClick={() =>
                            showModal("Create Course", {}, "create-course")
                        }
                    >
                        Create Course
                    </Button>
                </div>
                <CommonTable
                    columns={columns}
                    rows={courses}
                    handleAction={handleAction}
                    tableType="course"
                ></CommonTable>
            </Paper>

            <ModalComponent
                formTitle={modalOptions.title}
                open={modalOptions.open}
                closeModal={resetModalOptions}
            >
                {modalOptions.formName === "create-course" ? (
                    <CourseAddForm
                        data={modalOptions.data}
                        closeModal={resetModalOptions}
                        btnLabel={modalOptions.data?.id ? "Update" : "Add"}
                        updateCourseTable={setUpdateCourseTable}
                    />
                ) : null}

                {/* {modalOptions.formName === "update-user" ? (
                    <UserUpdateForm
                        data={modalOptions.data}
                        closeModal={resetModalOptions}
                        btnLabel={modalOptions.data?.id ? "Update" : "Add"}
                        updateCourseTable={setUpdateCourseTable}
                    />
                ) : null} */}

            </ModalComponent>
        </AdminLayout>
    );
};

export default Courses;
