import React, { useState, useEffect } from "react";
import {
    Paper,
    Typography,
    List,
    ListItem,
    Button,
    Grid,
    Card,
    CardContent,
    Divider,
    Box,
    Avatar,
    Stack,
} from "@mui/material";
import { FileDownload, School, AttachFile } from "@mui/icons-material";

// Mock API Call function (replace with actual API request)
const fetchStudentDetails = async () => {
    return {
        name: "John Doe",
        id: "12345",
        email: "john@example.com",
        attachments: ["attachment1.pdf", "attachment2.jpg"],
        courses: ["Math 101", "Science 202", "History 303"],
    };
};

function ProfileView({ data }) {
    const [isAdmin, setIsAdmin] = useState(true); // Assume admin status (this can be set via context or from login)
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        if (isAdmin) {
            // Fetch student data only if the user is an admin
            fetchStudentDetails().then((data) => setStudentData(data));
        }
    }, [isAdmin]);

    if (!isAdmin) {
        return (
            <Typography
                variant="h6"
                color="error"
                align="center"
                sx={{ padding: 3 }}
            >
                You are not authorized to view this page.
            </Typography>
        );
    }

    if (!studentData) {
        return (
            <Typography variant="h6" align="center">
                Loading student data...
            </Typography>
        );
    }
    console.log(data);
    return (
        <Box>
            {/* Main Paper */}
            <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    color="primary"
                >
                    Student Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <Stack alignItems="center">
                            <Avatar
                                src={data?.image}
                                alt="Preview"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: "12px",
                                    boxShadow: 3,
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item sm={6}>
                        <Card sx={{ marginBottom: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Name: </strong> {data?.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong> Student ID: </strong>
                                    {data?.students &&
                                        data?.students[0]["register_num"]}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Email: </strong> {data?.email}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Mobile: </strong>
                                    {data?.mobile}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>NIC: </strong>
                                    {data?.nic}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider sx={{ marginBottom: 2 }} />

                <Typography variant="h6" color="primary" gutterBottom>
                    <AttachFile sx={{ marginRight: 1 }} />
                    Attachments
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    gutterBottom
                                >
                                    NIC Document
                                </Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    href={`/attachments/${
                                        data?.students &&
                                        data?.students[0]["nic_document"]
                                    }`}
                                    target="_blank"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <FileDownload sx={{ marginRight: 1 }} />
                                    {data?.students &&
                                        data?.students[0]["nic_document"]}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    gutterBottom
                                >
                                    User Document
                                </Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    href={`/attachments/${
                                        data?.students &&
                                        data?.students[0]["document"]
                                    }`}
                                    target="_blank"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <FileDownload sx={{ marginRight: 1 }} />
                                    {data?.students &&
                                        data?.students[0]["document"]}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

                {/* Courses Section */}
                <Typography variant="h6" color="primary" gutterBottom>
                    <School sx={{ marginRight: 1 }} />
                    Courses Enrolled
                </Typography>
                <List sx={{ paddingLeft: 3 }}>
                    {studentData.courses.map((course, index) => (
                        <ListItem
                            key={index}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Typography variant="body1" sx={{ marginRight: 1 }}>
                                <strong>{course}</strong>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

export default ProfileView;
