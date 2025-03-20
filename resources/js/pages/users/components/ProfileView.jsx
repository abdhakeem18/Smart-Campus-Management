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
    Alert
} from "@mui/material";
import { FileDownload, School, AttachFile } from "@mui/icons-material";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import API from "@/config/api";
import { errorHandle } from "@/components/common/helper";

// Mock API Call function (replace with actual API request)

function ProfileView({ data, updateUserTable, closeModal }) {
    const { apiCall, loading, error } = API("admin");
    const [success, setSuccess] = useState("");

    const onApprove = async () => {
        setSuccess("");
        const response = await apiCall(`/user/approval/${data?.id}`, "PUT", {});

        if (response?.success) {
            setSuccess(response?.message);
            updateUserTable(true);
            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    };

    if (!data) {
        return (
            <Typography variant="h6" align="center">
                Loading student data...
            </Typography>
        );
    }
    const profileImagePath = `/storage/images/student`;

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
                                    {(data?.students).length > 0 &&
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
                {(data?.students).length > 0 && (
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
                                        href={`${profileImagePath}/nic/${
                                            (data?.students).length > 0 &&
                                            data?.students[0]["nic_document"]
                                        }`}
                                        target="_blank"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FileDownload sx={{ marginRight: 1 }} />
                                        {(data?.students).length > 0 &&
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
                                        href={`${profileImagePath}/documnet/${
                                            (data?.students).length > 0 &&
                                            data?.students[0]["document"]
                                        }`}
                                        target="_blank"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FileDownload sx={{ marginRight: 1 }} />
                                        {(data?.students).length > 0 &&
                                            data?.students[0]["document"]}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

                <Typography variant="h6" color="primary" gutterBottom>
                    <School sx={{ marginRight: 1 }} />
                    Courses Enrolled
                </Typography>
                {(data?.students).length > 0 && (
                    <List sx={{ paddingLeft: 3 }} key={"1"}>
                        {data?.students[0].courses.map((course, index) => (
                            <>
                                <ListItem
                                    key={course.course_code}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ marginRight: 1 }}
                                    >
                                        <strong>Code: </strong>
                                        {course.course_code}
                                    </Typography>
                                </ListItem>
                                <ListItem
                                    key={course.course_name}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ marginRight: 1 }}
                                    >
                                        <strong>Name: </strong>
                                        {course.course_name}
                                    </Typography>
                                </ListItem>
                            </>
                        ))}
                    </List>
                )}
                {success && <Alert severity="success">{success}</Alert>}

                {error && (
                    <>
                        <Alert severity="error">{errorHandle(error)}</Alert>
                    </>
                )}
                {!data?.is_active && (data?.students).length > 0 && (
                    <Box textAlign="center" mt={2} mb={2}>
                        <LoadingButtonComponent
                            label={"Approve"}
                            variant="contained"
                            loading={loading}
                            cls={"my-3"}
                            fullWidth={true}
                            onClick={onApprove}
                        />
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default ProfileView;
