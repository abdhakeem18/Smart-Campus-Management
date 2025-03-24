import React, { useEffect, useState, useRef } from "react";

// others
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/config/Api";
import TextInput from "@/components/inputs/TextInput";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import {
    Box,
    Alert,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
    InputLabel,
} from "@mui/material";
import { errorHandle } from "@/components/common/helper";

const SubjectEditForm = (props) => {
    const { closeModal, btnLabel, data, updateSubjectTable, courses, staffs } =
        props;
    const { apiCall, loading, error } = API("admin");
    const [success, setSuccess] = useState("");
    const modalRef = useRef(null);

    async function handleSubmit(values) {
        try {
            setSuccess("");
            const response = await apiCall(`/subjects/${data?.id}`, "PUT", values);

            if (response?.success) {
                setSuccess(response?.message);
                updateSubjectTable(true);
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            subject_name: data?.subject_name,
            subject_code: data?.subject_code,
            course_id: data?.course_id,
            lecturer_id: data?.lecturer_id
        },

        validationSchema: Yup.object({
            subject_name: Yup.string().required("Required"),
            subject_code: Yup.string().required("Required"),
            course_id: Yup.string().required("Required"),
            lecturer_id: Yup.string().required("Required"),
        }),

        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return (
        <Box ref={modalRef}>
            <form onSubmit={formik.handleSubmit} className="subject-form">
                {console.log(formik?.errors)}
                <TextInput
                    label="Subject Name"
                    value={formik.values.subject_name || ""}
                    getValue={(value) =>
                        formik.setFieldValue("subject_name", value)
                    }
                    error={Boolean(formik.errors.subject_name)}
                    errorMsg={formik.errors.subject_name}
                    classes={"mt-4"}
                />
                <TextInput
                    label="Subject ID"
                    value={formik.values.subject_code || ""}
                    getValue={(value) =>
                        formik.setFieldValue("subject_code", value)
                    }
                    error={Boolean(formik.errors.subject_code)}
                    errorMsg={formik.errors.subject_code}
                    classes={"mt-4"}
                />

                <FormControl
                    size="small"
                    className="col-12 col-md-6 my-4"
                    fullWidth
                    error={Boolean(formik.errors.course_id)}
                >
                    <InputLabel id={`coursList-select-label`}>
                        {"Select Courses"}
                    </InputLabel>
                    <Select
                        key={"coursList"}
                        labelId={`coursList-select-label`}
                        id={`coursList-select`}
                        value={formik.values.course_id || ""}
                        label={"Select Course"}
                        name={"Courses"}
                        required={true}
                        onChange={(e) =>
                            formik.setFieldValue("course_id", e.target.value)
                        }
                    >
                        {courses.map((option, index) => {
                            return (
                                <MenuItem value={index} key={option + index}>
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {formik.touched?.course_id && formik.errors?.course_id && (
                        <FormHelperText>
                            {formik.errors?.course_id}
                        </FormHelperText>
                    )}
                </FormControl>

                {/* Staff List */}
                <FormControl
                    size="small"
                    className="col-12 col-md-6"
                    fullWidth
                    error={Boolean(formik.errors.lecturer_id)}
                >
                    <InputLabel id={`staffList-select-label`}>
                        {"Select Lecturer"}
                    </InputLabel>
                    <Select
                        key={"staffList"}
                        labelId={`staffList-select-label`}
                        id={`staffList-select`}
                        value={formik.values.lecturer_id || ""}
                        label={"Select Lecturer"}
                        name={"Lecturer"}
                        required={true}
                        onChange={(e) =>
                            formik.setFieldValue("lecturer_id", e.target.value)
                        }
                    >
                        {staffs.map((option, index) => {
                            return (
                                <MenuItem value={index} key={option + index}>
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {formik.touched?.lecturer_id &&
                        formik.errors?.lecturer_id && (
                            <FormHelperText>
                                {formik.errors?.lecturer_id}
                            </FormHelperText>
                        )}
                </FormControl>
                <br />
                {success && <Alert severity="success">{success}</Alert>}

                {error && (
                    <>
                        <Alert severity="error">{errorHandle(error)}</Alert>
                    </>
                )}
                <Box textAlign="center" mt={2} mb={2}>
                    <LoadingButtonComponent
                        label={btnLabel}
                        variant="contained"
                        loading={loading}
                        cls={"my-3"}
                        fullWidth={true}
                    />
                </Box>
            </form>
        </Box>
    );
};

export default SubjectEditForm;
