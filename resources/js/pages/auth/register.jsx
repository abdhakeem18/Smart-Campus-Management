import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import Auth from "@/layouts/Auth";

const Register = () => {
    return (
        <Auth
            type={"registration"}
            content={
                <>
                    <Typography variant="body1" mb={2}>
                        Create your account
                    </Typography>

                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email address"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                    />

                    <Box textAlign="center" mt={2} mb={2}>
                        <Button variant="contained" color="primary" fullWidth>
                            Sign Up
                        </Button>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                    >
                        <Typography>Already have an account?</Typography>
                        <Link to={"/login"} variant="outlined" color="error">
                            Sign In
                        </Link>
                    </Box>
                </>
            }
        />
    );
};

export default Register;
