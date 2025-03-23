import React, { useContext, useEffect } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
} from "@mui/material";
import AppContext from "../config/AppContext";

const Auth = (props) => {
    const [contextData, setContextData] = useContext(AppContext);
    const { content, type, rightSection = true } = props;

    useEffect(() => {
        if (contextData)
            window.localStorage.setItem(
                "user-data",
                JSON.stringify(contextData),
            );
    }, [contextData]);

    return (
        <Container
            maxWidth="md"
            sx={{ marginTop: "5%" }}
            className={`${type}-container`}
        >
            <Grid container spacing={2} justifyContent="center">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{ p: 3, boxShadow: 3 }}
                        className={`${type}-form`}
                    >
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
                                SDP PROJECT
                            </Typography>
                        </Box>

                        <CardContent>{content}</CardContent>
                    </Card>
                </Grid>

                {/* Right Section */}
                {rightSection ? (
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
                                    Welcome to the Smart Campus Management
                                    System
                                </Typography>
                                <Typography variant="body2">
                                    Our system is designed to enhance campus
                                    operations, offering streamlined event
                                    management, equipment booking, and real-time
                                    scheduling for students and staff. We aim to
                                    provide an intuitive and efficient platform
                                    for managing daily campus activities.
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
        </Container>
    );
};

export default Auth;
