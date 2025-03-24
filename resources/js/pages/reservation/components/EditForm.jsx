import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, useMediaQuery, Alert } from "@mui/material";
import TextInput from "@/components/inputs/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextareaInput from "@/components/inputs/TextareaInput";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import API from "@/config/Api";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import { errorHandle } from "@/components/common/helper";

export default function UpdateReservation(props) {
    const { closeModal, data, btnLabel, updateReservationTable } = props;
    const isMobile = useMediaQuery("(max-width:600px)");
    const [success, setSuccess] = useState("");
    const { apiCall, loading, error } = API("admin");

    const handleClose = () => closeModal();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: data?.title,
            description: data?.description,
            date: data?.date,
            start_time: data?.start_time,
            end_time: data?.end_time,
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            date: Yup.string().required("StartDate is required"),
            start_time: Yup.string().required("StartTime is required"),
            end_time: Yup.string().required("EndTime is required"),
            description: Yup.string().required("Description is required"),
        }),

        onSubmit: (values, actions) => {
            handleSubmit(values, actions);
        },
    });

    const handleSubmit = async (values, { resetForm }) => {
        setSuccess("");
        const response = await apiCall("/schedules", "POST", values);

        if (response?.success) {
            setSuccess(response?.message);

            setTimeout(() => {
                updateReservationTable(true);
                resetAllData();
                resetForm();
                setSuccess("");
                closeModal();
            }, 2000);
        }
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <TextInput
                    label="Title"
                    value={formik.values.title || ""}
                    getValue={(value) => formik.setFieldValue("title", value)}
                    error={Boolean(formik.errors.title)}
                    errorMsg={formik.errors.title}
                    classes={""}
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
                        <div className="row time-picker">
                            <div className="col-md-6 col-12 mb-3 px-1">
                                <TimePicker
                                    label="Start Time"
                                    size="small"
                                    value={
                                        formik?.values?.start_time
                                            ? dayjs(
                                                  formik.values.start_time,
                                                  "HH:mm:ss",
                                              )
                                            : null
                                    }
                                    onChange={(newValue) => {
                                        const formattedTime = newValue
                                            ? newValue.format("HH:mm:ss")
                                            : null;
                                        formik.setFieldValue(
                                            "start_time",
                                            formattedTime,
                                        );

                                        if (
                                            formik?.values?.end_time &&
                                            newValue &&
                                            newValue.isAfter(
                                                dayjs(
                                                    formik.values.end_time,
                                                    "HH:mm:ss",
                                                ),
                                            )
                                        ) {
                                            formik.setFieldValue(
                                                "end_time",
                                                null,
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-md-6 col-12 mb-3 px-1">
                                <TimePicker
                                    label="End Time"
                                    size="small"
                                    value={
                                        formik?.values?.end_time
                                            ? dayjs(
                                                  formik.values.end_time,
                                                  "HH:mm:ss",
                                              )
                                            : null
                                    }
                                    onChange={(newValue) => {
                                        const formattedTime = newValue
                                            ? newValue.format("HH:mm:ss")
                                            : null;
                                        formik.setFieldValue(
                                            "end_time",
                                            formattedTime,
                                        );

                                        if (
                                            formik?.values?.start_time &&
                                            newValue &&
                                            newValue.isBefore(
                                                dayjs(
                                                    formik.values.start_time,
                                                    "HH:mm:ss",
                                                ),
                                            )
                                        ) {
                                            formik.setFieldValue(
                                                "end_time",
                                                null,
                                            );
                                        }
                                    }}
                                />
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
        </>
    );
}
