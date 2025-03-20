import React, { useEffect, useState, useRef } from "react";

// others
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/config/Api";
import TextInput from "@/components/inputs/TextInput";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import { Box, Alert } from "@mui/material";
import { errorHandle } from "@/components/common/helper";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextareaInput from "@/components/inputs/TextareaInput";

const CourseAddForm = (props) => {
    const { closeModal, btnLabel, data, updateUserTable } = props;
    const { apiCall, loading, error } = API("admin");
    const [success, setSuccess] = useState("");
    const modalRef = useRef(null);

    const userType = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Staff" },
        { id: 3, name: "Student" },
    ];

    async function handleSubmit(values) {
        try {
            setSuccess("");
            const response = await apiCall("/users", "POST", values);

            if (response?.success) {
                setSuccess(response?.message);
                updateUserTable(true);
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
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            mobile: "",
            role_id: "",
            nic: "",
            image: "",
            is_active: 1,
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            mobile: Yup.string().required("Required"),
            nic: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            password_confirmation: Yup.string().required("Required"),
        }),

        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return (
        <Box ref={modalRef}>
            <form onSubmit={formik.handleSubmit} className="user-form">
                <TextInput
                    label="Course Name"
                    value={formik.values.course_name || ""}
                    getValue={(value) => formik.setFieldValue("course_name", value)}
                    error={Boolean(formik.errors.course_name)}
                    errorMsg={formik.errors.course_name}
                    classes={"mt-4"}
                />

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
                            <div className="col-md-6 col-12 my-3 px-1">
                                <DemoItem label="Start Date">
                                    <MobileDatePicker
                                        defaultValue={dayjs(
                                            formik?.values?.start_date,
                                        )}
                                        minDate={dayjs()}
                                        sx={{
                                            padding: "0px",
                                        }}
                                        size="small"
                                        onChange={(newValue) =>
                                            formik.setFieldValue(
                                                "start_date",
                                                newValue,
                                            )
                                        }
                                    />
                                </DemoItem>
                            </div>
                            <div className="col-md-6 col-12 my-3 px-1">
                                <DemoItem label="End Date">
                                    <MobileDatePicker
                                        defaultValue={dayjs(
                                            formik?.values?.end_date,
                                        )}
                                        minDate={dayjs()}
                                        sx={{
                                            padding: "0px",
                                        }}
                                        size="small"
                                        onChange={(newValue) =>
                                            formik.setFieldValue(
                                                "end_date",
                                                newValue,
                                            )
                                        }
                                    />
                                </DemoItem>
                            </div>
                        </div>
                    </DemoContainer>
                </LocalizationProvider>

                <TextareaInput
                    id="description"
                    label="Description"
                    name="description"
                    classes={" mt-3"}
                    value={formik.values.description || ""}
                    getValue={(value) =>
                        formik.setFieldValue("description", value)
                    }
                    placeholder=""
                    required
                />

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

export default CourseAddForm;
