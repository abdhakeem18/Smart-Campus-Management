// Content.jsx
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AdminLayout from "@/layouts/Admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RegularCard from "@/components/cards/regulerCard";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/pieChart";

const Skeleton = styled("div")(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

const Dashboard = () => {
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    const [chartData, setChartData] = useState({
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [
            {
                label: "Shipment",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "#fc4454",
                borderColor: "#fc4454",
            },
        ],
    });

    return (
        <AdminLayout dashboard={true}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div className="min-height-300 bg-primary-cu position-absolute w-100 position-top-left"></div>
                <Typography
                    sx={{ marginBottom: 2, marginTop: "50px", zIndex: 10 }}
                    component={"div"}
                    className="container-fluid py-4 row"
                >
                    <RegularCard />

                    <Typography component={"div"} className="col-6 z-1 mt-4">
                        <LineChart
                            cardName="Total Shipments"
                            chartData={chartData}
                        />
                    </Typography>
                    <Typography component={"div"} className="col-6 z-1 mt-4">
                        <PieChart cardName="Charts" />
                    </Typography>
                </Typography>
            </Box>
        </AdminLayout>
    );
};

export default Dashboard;
