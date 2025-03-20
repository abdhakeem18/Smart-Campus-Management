import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Box, Alert } from "@mui/material";
import Auth from "@/layouts/Auth";
import SelectInput from "@/components/inputs/SelectInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/config/Api";
import AppContext from "@/config/AppContext";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import FileUploadInput from "@/components/inputs/FileUploadInput";
import { errorHandle } from "@/components/common/helper";

const CourseRegister = () => {
    const [contextData, setContextData] = useContext(AppContext);
    const [registered, setRegistered] = useState(false);
    const [success, setSuccess] = useState("");
    const { apiCall, loading, apiError } = API(
        contextData?.roles[contextData?.userDetails?.role_id],
    );

    async function registerSubmit(values) {
        try {
            setSuccess("");
            const response = await apiCall(
                "/course-registration",
                "POST",
                values,
            );

            if (response?.success) {
                setSuccess(response?.message);
                setContextData((prevState) => ({
                    ...prevState,
                    step: "next",
                }));
                setTimeout(() => {
                    navigator("/dashboard");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            user_id: contextData?.userDetails?.id,
            course_id: "",
            document: "",
            nic_document: "",
        },

        validationSchema: Yup.object({
            course_id: Yup.string().required("Required"),
            document: Yup.string().required("Required"),
            nic_document: Yup.string().required("Required"),
        }),

        onSubmit: async (values) => {
            // console.log("values => ", values);
            await registerSubmit(values);
        },
    });

    return (
        <Auth
            type={"courses-registration"}
            content={
                !registered ? (
                    <>
                        <Typography
                            variant="body1"
                            mb={2}
                            component={"p"}
                            textAlign={"center"}
                        >
                            Course Registration
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <SelectInput
                                label="Select Course"
                                value={formik.values.course_id || ""}
                                getValue={(value) =>
                                    formik.setFieldValue("course_id", value)
                                }
                                data={contextData?.courses}
                                error={Boolean(formik.errors.course_id)}
                                errorMsg={formik.errors.course_id}
                                classes={"my-3"}
                            />

                            <Typography component={"div"}>
                                <FileUploadInput
                                    type={"image"}
                                    title={"NIC"}
                                    allowedExtension={["jpg", "png", "JPEG"]}
                                    value={formik.values.nic_document || ""}
                                    getValue={(value) =>
                                        formik.setFieldValue(
                                            "nic_document",
                                            value,
                                        )
                                    }
                                    error={Boolean(formik.errors.nic_document)}
                                    errorMsg={formik.errors.nic_document}
                                />
                            </Typography>

                            <Typography component={"div"}>
                                <FileUploadInput
                                    type={"pdf"}
                                    title={"CV"}
                                    allowedExtension={["pdf"]}
                                    value={formik.values.document || ""}
                                    getValue={(value) =>
                                        formik.setFieldValue("document", value)
                                    }
                                    error={Boolean(formik.errors.document)}
                                    errorMsg={formik.errors.document}
                                />
                            </Typography>

                            {success && (
                                <Alert severity="success">{success}</Alert>
                            )}

                            {error && (
                                <>
                                    <Alert severity="error">
                                        {errorHandle(error)}
                                    </Alert>
                                </>
                            )}

                            <Box textAlign="center" mt={2} mb={2}>
                                <LoadingButtonComponent
                                    label={"Register"}
                                    variant="contained"
                                    loading={loading}
                                    cls={"my-3"}
                                    fullWidth={true}
                                />
                            </Box>
                        </form>
                    </>
                ) : (
                    <></>
                )
            }
        />
    );
};

export default CourseRegister;
