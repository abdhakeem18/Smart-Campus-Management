import React from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";

const Register = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: "50px" }} className="registration-container">
            <Grid container spacing={2} justifyContent="center">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, boxShadow: 3 }} className="registration-form">
                        <Box textAlign="center">
                            <CardMedia
                                component="img"
                                image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                alt="logo"
                                sx={{ width: 150, mx: "auto", mb: 2 }}
                            />
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
                                We are The Lotus Team
                            </Typography>
                        </Box>

                        <CardContent>
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </Box>

                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap={1}
                            >
                                <Typography>
                                    Already have an account?
                                </Typography>
                                <Button variant="outlined" color="error">
                                    Sign In
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            background:
                                "linear-gradient(135deg, #ff4081, #ff9100)",
                            color: "#fff",
                            p: 4,
                        }}
                    >
                        <Box textAlign="center">
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
                                We are more than just a company
                            </Typography>
                            <Typography variant="body2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
