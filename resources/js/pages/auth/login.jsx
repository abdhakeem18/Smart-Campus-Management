import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import TextInput from "@/components/inputs/TextInput";
import Auth from "@/layouts/Auth";
import API from "@/config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppContext from "@/config/AppContext";

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
                setContextData((prevState) => ({
                    ...prevState,
                    userDetails: response.data,
                }));

                // if (!response?.data?.email_verified_at) {
                //     await navigate("/verify-email");
                // } else if (!response?.data?.course) {
                //     await navigate("/register");
                // }
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
            await loginSubmit(values);
        },
    });

    return (
        <Auth
            type={"login"}
            content={
                <>
                    <form onSubmit={formikSignin.handleSubmit}>
                        <Typography variant="body1" mb={2}>
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
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disabled={loading}
                            >
                                Sign in
                            </Button>
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
