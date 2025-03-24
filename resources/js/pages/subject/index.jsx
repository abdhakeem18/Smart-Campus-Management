import React, { useEffect, useState } from "react";
import PageLayout from "@/layouts/Page";
import { Button, Paper } from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import API from "@/config/api";
import ModalComponent from "@/components/modals/Modal";
import SubjectAddForm from "./components/AddForm";
import SubjectEditForm from "./components/EditForm";

const columns = [
    { id: "subject_code", label: "ID", minWidth: 100 },
    { id: "subject_name", label: "Name", minWidth: 100 },
    { id: "course_name", label: "Course", minWidth: 100 },
    { id: "lecturer_details", label: "Lecturer", minWidth: 100 },
    { id: "action", label: "Action", maxWidth: 100, align: "right" },
];

const Subjects = () => {
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

    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [udateSubjectTable, setUpdateSubjectTable] = useState(true);
    const { apiCall, loading, error } = API("admin");

    async function fetchSubjects() {
        const course_details = await apiCall("/courses");

        if (course_details?.success) {
            let courseList = [];

            course_details.data.map((course) => {
                courseList[course.id] = course.course_name;
            });

            setCourses(courseList);

            const response = await apiCall("/subjects");

            if (response?.success) {
                let subjectList = [];
                (response?.data).map((subject) => {
                    subjectList.push({
                        id: subject.id,
                        subject_code: subject?.subject_code,
                        subject_name: subject?.subject_name,
                        course_name: courseList[subject?.course_id],
                        course_id: subject?.course_id,
                        lecturer_details: `${subject?.lecture?.name} (${subject?.lecture?.email})`,
                        lecturer_id: subject?.lecture?.id
                    });
                });

                setSubjects(subjectList);

                const staff_response = await apiCall("/staffs");

                if (staff_response?.success) {
                    let staffList = [];
                    (staff_response?.data).map((staff) => {
                        staffList[staff.id] = `${staff.name}(${staff.email})`;
                    });

                    setStaffs(staffList);
                }
            }
        }
    }

    useEffect(() => {
        if (udateSubjectTable) {
            fetchSubjects();

            setUpdateSubjectTable(false);

            return () => {
                fetchSubjects();
            };
        }
    }, [udateSubjectTable]);

    async function handleAction(action, selectedRow) {
        if (action === "Edit")
            showModal("Update Subject", selectedRow, "update-subject");
    }

    return (
        <PageLayout title={"Subjects"}>
            <Paper
                className="user-table border-4"
                sx={{ width: "100%", overflow: "hidden", boxShadow: 0 }}
            >
                <div className="m-3 text-end">
                    <Button
                        variant="contained"
                        onClick={() =>
                            showModal("Create Subject", {}, "create-subject")
                        }
                    >
                        Create Subject
                    </Button>
                </div>
                <CommonTable
                    columns={columns}
                    rows={subjects}
                    handleAction={handleAction}
                    tableType="subject"
                ></CommonTable>
            </Paper>

            <ModalComponent
                formTitle={modalOptions.title}
                open={modalOptions.open}
                closeModal={resetModalOptions}
            >
                {modalOptions.formName === "create-subject" ? (
                    <SubjectAddForm
                        data={modalOptions.data}
                        courses={courses}
                        staffs={staffs}
                        closeModal={resetModalOptions}
                        btnLabel={"Add"}
                        updateSubjectTable={setUpdateSubjectTable}
                    />
                ) : null}

                {modalOptions.formName === "update-subject" ? (
                    <SubjectEditForm
                        data={modalOptions.data}
                        courses={courses}
                        staffs={staffs}
                        closeModal={resetModalOptions}
                        btnLabel={"Update"}
                        updateSubjectTable={setUpdateSubjectTable}
                    />
                ) : null}
            </ModalComponent>
        </PageLayout>
    );
};

export default Subjects;
