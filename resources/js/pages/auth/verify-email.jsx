import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Auth from "@/layouts/Auth";

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const [loader, setLoader] = useState(false);
    const [nextButton, setNextButton] = useState(true);

    const validateOTP = (value) => {
        setOtp(value);

        setNextButton(false);
    };

    const matchIsNumeric = (text) => {
        const isNumber = typeof text === "number";
        const isString = typeof text === "string";
        return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
    };

    const validateChar = (value, index) => {
        const result = matchIsNumeric(value);
        if (result) {
            setOtp(otp + value);
        }

        return result;
    };

    return (
        <Auth
            type={"verify-email"}
            content={
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
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={nextButton}
                        >
                            verify
                        </Button>
                    </Box>
                </>
            }
            rightSection={false}
        />
    );
};

export default VerifyEmail;
