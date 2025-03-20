import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import TextInput from "@/components/inputs/TextInput";
import Auth from "@/layouts/Auth";
import API from "@/config/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppContext from "@/config/AppContext";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import { Inertia } from '@inertiajs/inertia';

const Login = () => {
    const [contextData, setContextData] = useContext(AppContext);
    const navigate = useNavigate();
    const { apiCall, loading, apiError } = API("auth");
    const location = useLocation();
    const errorMessage = location.state?.errorMessage;

    async function loginSubmit(values) {
        try {
            // const apiv = API("auth");
            const response = await apiCall("/login", "POST", values);

            if (response?.success) {
                const courses = await apiCall("/courses", "GET");

                setContextData((prevState) => ({
                    ...prevState,
                    userDetails: response.data,
                    courses: courses.data,
                    step: !response?.data?.email_verified_at
                        ? "verify"
                        : !response?.data?.students
                          ? "register"
                          : "next",
                }));
            }
        } catch (error) {
            console.log(apiError);
        }
    }

    const formikSignin = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
        }),

        onSubmit: async (values) => {
            Inertia.post(
                "/login",
                { values },
                {
                    onFinish: () => setLoading(false),
                    onError: (err) => setErrors(err),
                },
            );
        },
    });

    return (
        <Auth
            type={"login"}
            content={
                <>
                    <form onSubmit={formikSignin.handleSubmit}>
                        <Typography variant="body1" mb={2} textAlign="center">
                            Please login to your account
                        </Typography>

                        <TextInput
                            label="Email"
                            type="email"
                            value={formikSignin.values.email || ""}
                            getValue={(value) =>
                                formikSignin.setFieldValue("email", value)
                            }
                            error={Boolean(formikSignin.errors.email)}
                            errorMsg={formikSignin.errors.email}
                            classes={"mt-2"}
                        />
                        <TextInput
                            label="password"
                            type="password"
                            value={formikSignin.values.password || ""}
                            getValue={(value) =>
                                formikSignin.setFieldValue("password", value)
                            }
                            error={Boolean(formikSignin.errors.password)}
                            errorMsg={formikSignin.errors.password}
                            classes={"mt-3"}
                        />

                        <Box textAlign="center" mt={2} mb={2}>
                            <LoadingButtonComponent
                                label={"Sign In"}
                                variant="contained"
                                loading={loading}
                                cls={"my-3"}
                                fullWidth={true}
                            />
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                mt={2}
                            >
                                <Link to={"/forgot-password"}>
                                    Forgot password?
                                </Link>
                            </Typography>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={1}
                        >
                            <Typography>Don't have an account?</Typography>
                            <Link
                                to={"/register"}
                                variant="outlined"
                                color="error"
                            >
                                Sign Up
                            </Link>
                        </Box>
                    </form>
                </>
            }
        />
    );
};

export default Login;
