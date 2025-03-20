import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import Auth from "@/layouts/Auth";
import TextInput from "@/components/inputs/TextInput";
import { useFormik } from "formik";
import API from "@/config/api";
import * as Yup from "yup";
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const { apiCall, loading, apiError } = API("auth");
    const [linkSend, setLinkSend] = useState(false);

    async function forgetPassSubmit(values) {
        try {
            const response = await apiCall(
                "/send/password/reset",
                "POST",
                values,
            );

            if (response?.success) {
                setLinkSend(true);
            }
        } catch (error) {
            console.log(apiError);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
        },

        validationSchema: Yup.object({
            email: Yup.string().required("Required"),
        }),

        onSubmit: async (values) => {
            await forgetPassSubmit(values);
        },
    });

    return (
        <Auth
            type={"forget-password"}
            content={
                linkSend ? (
                    <>
                        <Box textAlign="center" mt={2} mb={2}>
                            <MarkEmailUnreadIcon
                                color={"success"}
                                fontSize={"large"}
                            />
                            <h3>OPEN YOUR EMAIL</h3>
                            <p>
                                We have sent a password recover instruction to
                                your email.
                            </p>

                            <Button
                                variant="contained"
                                href="/login"
                            >
                                Log in with password
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <TextInput
                                label="Email"
                                type="email"
                                value={formik.values.email || ""}
                                getValue={(value) =>
                                    formik.setFieldValue("email", value)
                                }
                                error={Boolean(formik.errors.email)}
                                errorMsg={formik.errors.email}
                                classes={"mt-2"}
                            />
                            <Box textAlign="center" mt={2} mb={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    disabled={loading}
                                >
                                    Reset Password
                                </Button>
                            </Box>
                        </form>
                    </>
                )
            }
            rightSection={false}
        />
    );
};

export default ForgetPassword;
