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
        if(contextData) window.localStorage.setItem("user-data", JSON.stringify(contextData));
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
                                We are The Lotus Team
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
                ) : (
                    ""
                )}
            </Grid>
        </Container>
    );
};

export default Auth;
