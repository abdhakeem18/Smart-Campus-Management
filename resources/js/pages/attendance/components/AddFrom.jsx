import React, { useState } from "react";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Button,
    Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";

const courses = [
    {
        id: 1,
        name: "Computer Science",
        subjects: ["Data Structures", "Algorithms"],
    },
    {
        id: 2,
        name: "Business Administration",
        subjects: ["Marketing", "Finance"],
    },
];

const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
];

const AttendanceTrack = ({ closeModal, handleAttendance }) => {
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const handleAttendanceChange = (studentId) => {
        setAttendance((prev) => ({
            ...prev,
            [studentId]: !prev[studentId],
        }));
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            course: "",
            subject: "",
            date: "",
        },

        validationSchema: Yup.object({
            course: Yup.string().required("Title is required"),
            date: Yup.string().required("StartDate is required"),
            subject: Yup.string().required("StartTime is required"),
        }),

        onSubmit: (values) => {
            setLoading(true);
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        // console.log(values);
        setLoading(false);

        const attendedCount = Object.values(attendance).filter(Boolean).length;
        const attendancePercentage = Math.round((attendedCount / students.length) * 100);
        handleAttendance(values, attendancePercentage);
    };

    return (
        <Box sx={{ p: 4 }}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={Boolean(formik?.errors?.course)}
                >
                    <InputLabel id={`course-select-label`}>
                        Select Course
                    </InputLabel>
                    <Select
                        value={formik?.values?.course}
                        key={"course"}
                        labelId={`course-select-label`}
                        id={`course-select`}
                        label={"Select Course"}
                        name={"Course"}
                        required={true}
                        onChange={(newValue) => {
                            formik.setFieldValue(
                                "course",
                                newValue.target.value,
                            );
                        }}
                    >
                        {courses.map((course) => (
                            <MenuItem key={course.id} value={course.name}>
                                {course.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched?.course && formik.errors?.course && (
                        <FormHelperText>{formik.errors?.course}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    disabled={!formik?.values?.course}
                    error={Boolean(formik?.errors?.subject)}
                >
                    <InputLabel id={`select-subject-label`}>
                        Select Subject
                    </InputLabel>
                    <Select
                        value={formik.values.subject}
                        key={"subject"}
                        labelId={`subject-select-label`}
                        id={`subject-select`}
                        label={"Select Subject"}
                        name={"subject"}
                        required={true}
                        onChange={(newValue) => {
                            formik.setFieldValue(
                                "subject",
                                newValue.target.value,
                            );
                        }}
                    >
                        {courses
                            .find(
                                (course) =>
                                    course.name === formik?.values?.course,
                            )
                            ?.subjects.map((subject, index) => (
                                <MenuItem key={index} value={subject}>
                                    {subject}
                                </MenuItem>
                            ))}
                    </Select>
                    {formik.touched?.subject && formik.errors?.subject && (
                        <FormHelperText>
                            {formik.errors?.subject}
                        </FormHelperText>
                    )}
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                            "MobileDatePicker",
                            "TimePicker",
                            "TimePicker",
                        ]}
                        size="small"
                    >
                        <div className="row date-picker">
                            <div className="col-12 px-0">
                                <DemoItem label="Start Date">
                                    <MobileDatePicker
                                        defaultValue={dayjs(
                                            formik?.values?.date,
                                        )}
                                        minDate={dayjs()}
                                        sx={{
                                            padding: "0px",
                                        }}
                                        size="small"
                                        onChange={(newValue) =>
                                            formik.setFieldValue(
                                                "date",
                                                newValue,
                                            )
                                        }
                                    />
                                </DemoItem>
                            </div>
                        </div>
                    </DemoContainer>
                </LocalizationProvider>

                {formik?.values?.course && formik?.values?.subject && (
                    <>
                        <TableContainer component={Paper} sx={{ mt: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Student Name</TableCell>
                                        <TableCell>Present</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>
                                                {student.name}
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={
                                                        attendance[
                                                            student.id
                                                        ] || false
                                                    }
                                                    onChange={() =>
                                                        handleAttendanceChange(
                                                            student.id,
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box textAlign="center" mt={2} mb={2}>
                            <LoadingButtonComponent
                                label={"Submit Attendance"}
                                variant="contained"
                                loading={loading}
                                cls={"my-3"}
                                fullWidth={true}
                            />
                        </Box>
                    </>
                )}
            </form>
        </Box>
    );
};

export default AttendanceTrack;
