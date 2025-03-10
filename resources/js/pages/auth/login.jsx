import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import Auth from "@/layouts/Auth";

const Login = () => {
    return (
        <Auth
            type={"login"}
            content={
                <>
                    <Typography variant="body1" mb={2}>
                        Please login to your account
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email address"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                    />

                    <Box textAlign="center" mt={2} mb={2}>
                        <Button variant="contained" color="primary" fullWidth>
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
                        <Link to={"/register"} variant="outlined" color="error">
                            Sign Up
                        </Link>
                    </Box>
                </>
            }
        />
    );
};

export default Login;
