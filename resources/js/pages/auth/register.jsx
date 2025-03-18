import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import Auth from "@/layouts/Auth";
import TextInput from "@/components/inputs/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/config/api";
import AppContext from "@/config/AppContext";

const Register = () => {
    const [contextData, setContextData] = useContext(AppContext);
    const [registered, setRegistered] = useState();
    const navigate = useNavigate();
     const { apiCall, loading, apiError } = API("auth");

    async function registerSubmit(values) {
        try {
            const apiv = API("auth");
            const response = await apiCall("/register", "POST", values);

            if (response?.success) {
                setContextData((prevState) => ({
                    ...prevState,
                    user_info: response.data,
                }));

                if (!response?.data?.email_verified_at) {
                    await navigate("/verify-email");
                } 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formikSignup = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            mobile: "",
            role_id: 3,
            nic: "",
            image: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            mobile: Yup.string().required("Required"),
            nic: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            password_confirmation: Yup.string().required("Required"),
        }),

        onSubmit: async (values) => {
            // console.log("values => ", values);
            await registerSubmit(values);
        },
    });

    return (
        <Auth
            type={"registration"}
            content={
                registered ? (
                    <>
                        <Typography variant="body1" mb={2}>
                            Create your account
                        </Typography>
                        <form onSubmit={formikSignup.handleSubmit}>
                            <TextInput
                                label="Full Name"
                                value={formikSignup.values.name || ""}
                                getValue={(value) =>
                                    formikSignup.setFieldValue("name", value)
                                }
                                error={Boolean(formikSignup.errors.name)}
                                errorMsg={formikSignup.errors.name}
                                classes={"mt-3"}
                            />
                            <TextInput
                                label="Email"
                                type="email"
                                value={formikSignup.values.email || ""}
                                getValue={(value) =>
                                    formikSignup.setFieldValue("email", value)
                                }
                                error={Boolean(formikSignup.errors.email)}
                                errorMsg={formikSignup.errors.email}
                                classes={"mt-3"}
                            />

                            <TextInput
                                label="Phone Number"
                                type="number"
                                value={formikSignup.values.mobile || ""}
                                getValue={(value) =>
                                    formikSignup.setFieldValue("mobile", value)
                                }
                                error={Boolean(formikSignup.errors.mobile)}
                                errorMsg={formikSignup.errors.mobile}
                                classes={"mt-3"}
                            />

                            <TextInput
                                label="NIC"
                                value={formikSignup.values.nic || ""}
                                getValue={(value) =>
                                    formikSignup.setFieldValue("nic", value)
                                }
                                error={Boolean(formikSignup.errors.nic)}
                                errorMsg={formikSignup.errors.nic}
                                classes={"mt-3"}
                            />

                            {/* <TextInput
                            // label="Date of Birth"
                            type="date"
                            value={formikSignup.values.dob || ""}
                            getValue={(value) =>
                                formikSignup.setFieldValue("dob", value)
                            }
                            error={Boolean(formikSignup.errors.dob)}
                            errorMsg={formikSignup.errors.dob}
                            classes={"mt-3"}
                        /> */}

                            <TextInput
                                label="password"
                                type="password"
                                value={formikSignup.values.password || ""}
                                getValue={(value) =>
                                    formikSignup.setFieldValue(
                                        "password",
                                        value,
                                    )
                                }
                                error={Boolean(formikSignup.errors.password)}
                                errorMsg={formikSignup.errors.password}
                                classes={"mt-3"}
                            />

                            <TextInput
                                label="Confirm Password"
                                type="password"
                                value={
                                    formikSignup.values.password_confirmation ||
                                    ""
                                }
                                getValue={(value) =>
                                    formikSignup.setFieldValue(
                                        "password_confirmation",
                                        value,
                                    )
                                }
                                error={Boolean(
                                    formikSignup.errors.password_confirmation,
                                )}
                                errorMsg={
                                    formikSignup.errors.password_confirmation
                                }
                                classes={"mt-3"}
                            />

                            <Box textAlign="center" mt={2} mb={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled={loading}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </form>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={1}
                        >
                            <Typography>Already have an account?</Typography>
                            <Link
                                to={"/login"}
                                variant="outlined"
                                color="error"
                            >
                                Sign In
                            </Link>
                        </Box>
                    </>
                ) : (
                    <></>
                )
            }
        />
    );
};

export default Register;
