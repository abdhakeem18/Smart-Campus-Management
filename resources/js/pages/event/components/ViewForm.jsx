import React, { useContext } from "react";
import {
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    Box,
    Avatar,
    Stack,
    Alert,
} from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import { errorHandle } from "@/components/common/helper";
import AppContext from "@/config/AppContext";

function ViewEvent({ onApprove, data, loading, success, error }) {
    const [contextData, setContextData] = useContext(AppContext);

    if (!data) {
        return (
            <Typography variant="h6" align="center">
                Loading student data...
            </Typography>
        );
    }
    const storePath = `/storage/images/student`;
    console.log("data => ", data);
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
                    Event Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <Stack alignItems="center">
                            <Avatar
                                src={`${storePath}/profile/${data?.user?.image}`}
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
                        <Card
                            sx={{
                                marginBottom: 3,
                                borderRadius: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Name: </strong> {data?.user?.name}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Email: </strong> {data?.user?.email}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Mobile: </strong>
                                    {data?.user?.mobile}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>NIC: </strong>
                                    {data?.user?.nic}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Divider />
                    <Grid item sm={12}>
                        <Card
                            sx={{
                                marginBottom: 3,
                                borderRadius: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Title: </strong> {data?.title}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Description: </strong>{" "}
                                    {data?.description}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    component={"span"}
                                    sx={{
                                        float: "left",
                                    }}
                                >
                                    {data?.start}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    component={"span"}
                                    height={"30px"}
                                    sx={{
                                        float: "left",
                                        px: 2,
                                    }}
                                >
                                    {<ArrowRightAlt />}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    component={"span"}
                                >
                                    {data?.end}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                {data?.equipment_id && (
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                    >
                                        <strong>Equipment: </strong>{" "}
                                        {
                                            contextData.equipments[
                                                data?.equipment_id
                                            ]
                                        }
                                    </Typography>
                                )}
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    <strong>Location: </strong> {data?.location}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider sx={{ marginBottom: 2 }} />
                {success && <Alert severity="success">{success}</Alert>}

                {error && (
                    <>
                        <Alert severity="error">{errorHandle(error)}</Alert>
                    </>
                )}
                {(data?.status === "Pending" &&  contextData?.userDetails?.role_id === 1) && (
                    <Box textAlign="left" mb={5}>
                        <LoadingButtonComponent
                            label={"Approve"}
                            variant="contained"
                            loading={loading}
                            cls={"my-1"}
                            fullWidth={true}
                            onClick={() => {
                                const isConfirmed = window.confirm(
                                    "Are you sure you want to approve this request?",
                                );
                                if (isConfirmed) {
                                    onApprove(data?.id, 1);
                                }
                            }}
                        />
                        <LoadingButtonComponent
                            label={"Reject"}
                            variant="contained"
                            loading={loading}
                            cls={"my-1"}
                            color="error"
                            fullWidth={true}
                            onClick={() => {
                                const isConfirmed = window.confirm(
                                    "Are you sure you want to reject this request?",
                                );
                                if (isConfirmed) {
                                    onApprove(data?.id, 2);
                                }
                            }}
                        />
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default ViewEvent;
