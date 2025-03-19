import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Auth from "@/layouts/Auth";
import AppContext from "@/config/AppContext";
import API from "@/config/Api";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [contextData, setContextData] = useContext(AppContext);
    const [otp, setOtp] = useState("");
    const [next, setNext] = useState(false);
    const { apiCall, loading, apiError } = API(
        contextData?.roles[contextData?.userDetails?.role_id],
    );

    const [emailVerified, setEmailVerified] = useState(
        contextData?.userDetails?.email_verified_at,
    );

    const validateOTP = (value) => {
        setOtp(value);
        setNext(true);
    };

    async function verifyOTP() {
        try {
            const response = await apiCall("/verify", "POST", { code: otp });

            if (response?.success) {
                setContextData((prevState) => ({
                    ...prevState,
                    step: !response?.data?.courses ? "register" : "next",
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const matchIsNumeric = (text) => {
        const isNumber = typeof text === "number";
        const isString = typeof text === "string";
        return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
    };

    const resendOTP = async () => {
        try {
            const response = await apiCall("/resend/verify", "POST", []);

            if (response?.success) {
                console.log(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validateChar = (value, index) => {
        const result = matchIsNumeric(value);
        if (result) {
            setOtp(otp + value);
        }

        return result;
    };

    useEffect(() => {
        if (otp != "" && next) {
            verifyOTP();
            setNext(false);
        }
    }, [next]);

    return (
        <Auth
            type={"verify-email"}
            content={
                emailVerified ? (
                    <Box textAlign="center" mt={2} mb={2}>
                        <MarkEmailReadIcon
                            color={"success"}
                            fontSize={"large"}
                        />
                        <h3>THANK YOU!</h3>
                        <p>Your Email Verified Succuessfully</p>
                    </Box>
                ) : (
                    <>
                        <Typography variant="body1" mb={2} textAlign="center">
                            Enter OTP
                        </Typography>
                        <MuiOtpInput
                            value={otp}
                            onComplete={validateOTP}
                            validateChar={validateChar}
                            TextFieldsProps={{ size: "small" }}
                            length={6}
                        />

                        <Box textAlign="center" mt={2} mb={2}>
                            <Typography
                                variant="body2"
                                color="primary"
                                mt={2}
                                courser="pointer"
                                onClick={resendOTP}
                            >
                                Resend OTP
                            </Typography>
                        </Box>
                    </>
                )
            }
            rightSection={false}
        />
    );
};

export default VerifyEmail;
