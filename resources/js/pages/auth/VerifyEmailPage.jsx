import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Alert } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Auth from "@/layouts/Auth";
import AppContext from "@/config/AppContext";
import API from "@/config/Api";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { errorHandle } from "@/components/common/helper";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [contextData, setContextData] = useContext(AppContext);
    const [otp, setOtp] = useState("");
    const [next, setNext] = useState(false);
    const [success, setSuccess] = useState("");
    const { apiCall, loading, error } = API(
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
        setSuccess("");

        const response = await apiCall("/verify", "POST", { code: otp });

        if (response?.success) {
            setSuccess(response?.message);

            setTimeout(() => {
                setContextData((prevState) => ({
                    ...prevState,
                    step: (contextData?.userDetails?.students).length === 0 && response?.userDetails?.role_id === 3 ? "register" : "next",
                }));
            }, 3000);
        }
    }

    const matchIsNumeric = (text) => {
        const isNumber = typeof text === "number";
        const isString = typeof text === "string";
        return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
    };

    const resendOTP = async () => {
        try {
            setSuccess("");

            const response = await apiCall("/resend/verify", "POST", []);

            if (response?.success) {
                setSuccess(response?.message);
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
                            autoFocus
                        />

                        <Box textAlign="center" mt={2} mb={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                mt={2}
                                courser="pointer"
                                onClick={resendOTP}
                                disabled={loading}
                            >
                                Resend OTP
                            </Button>
                        </Box>
                        {success && <Alert severity="success">{success}</Alert>}
                        {error && (
                            <Alert severity="error">{errorHandle(error)}</Alert>
                        )}
                    </>
                )
            }
            rightSection={false}
        />
    );
};

export default VerifyEmail;
