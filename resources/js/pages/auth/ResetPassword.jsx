import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
    Box,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormControl,
    IconButton,
    Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Auth from "@/layouts/Auth";
import API from "@/config/api";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import { errorHandle } from "@/components/common/helper";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState("");
    const { apiCall, loading, error } = API("auth");

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConPassword = () =>
        setShowConPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handSubmit = async () => {
        setSuccess("");

        const response = await apiCall(
            "/reset-password/{token}",
            "POST",
            {
                password: password,
                password_confirmation: confirmPassword
            },
        );

        if (response?.success) {
            setSuccess(response?.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    const handleInputChange = async (event) => {
        const value = event.target.value;

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const newTypingTimeout = setTimeout(() => {
            if (event.target.name === "password") {
                setPassword(value);
            } else {
                setConfirmPassword(value);
            }
        }, 1000);

        setTypingTimeout(newTypingTimeout);
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
                            onChange={handleInputChange}
                            required
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
                            sx={{ marginTop: "10px" }}
                        >
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type={showConPassword ? "text" : "password"}
                            name="confirm-password"
                            label="Confirm Password"
                            fullWidth
                            onChange={handleInputChange}
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
                        {success && <Alert severity="success">{success}</Alert>}

                        {error && (
                            <>
                                <Alert severity="error">{errorHandle(error)}</Alert>
                            </>
                        )}

                        <Box textAlign="center" mt={2} mb={2}>
                            <LoadingButtonComponent
                                label={"Reset Password"}
                                variant="contained"
                                loading={loading}
                                cls={"my-3"}
                                fullWidth={true}
                                onClick={handSubmit}
                            />
                        </Box>
                    </FormControl>
                </>
            }
            rightSection={false}
        />
    );
};

export default ResetPassword;
