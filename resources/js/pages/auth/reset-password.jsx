import React, { useState, useEffect } from "react";
import {
    Button,
    Typography,
    Box,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormControl,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Auth from "@/layouts/Auth";

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [loader, setLoader] = useState(false);
    const [nextButton, setNextButton] = useState(true);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConPassword = () =>
        setShowConPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const passwordMatch = (input) => {
        confirmPassword = input.target.value;

        if (confirmPassword === password) {
            console.log("seet");
        }
    };

    return (
        <Auth
            type={"verify-email"}
            content={
                <>
                    <Typography variant="body1" mb={2} textAlign="center">
                        Set new password
                    </Typography>
                    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
                        {/* Password */}

                        <InputLabel
                            size="small"
                            htmlFor="outlined-adornment-password"
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            fullWidth
                            margin="normal"
                            size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff fontSize="inherit" />
                                        ) : (
                                            <Visibility fontSize="inherit" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    {/* Confirm Password */}
                    <FormControl fullWidth variant="outlined">
                        <InputLabel
                            size="small"
                            htmlFor="outlined-adornment-confirm-password"
                            sx={{marginTop: "10px"}}
                        >
                           Confirm Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type={showConPassword ? "text" : "password"}
                            name="confirm-password"
                            label="Confirm Password"
                            fullWidth
                            sx={{ marginTop: "10px" }}
                            size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="small"
                                    >
                                        {showConPassword ? (
                                            <VisibilityOff fontSize="inherit" />
                                        ) : (
                                            <Visibility fontSize="inherit" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        <Box textAlign="center" mt={2} mb={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={nextButton}
                            >
                                Reset password
                            </Button>
                        </Box>
                    </FormControl>
                </>
            }
            rightSection={false}
        />
    );
};

export default ResetPassword;
