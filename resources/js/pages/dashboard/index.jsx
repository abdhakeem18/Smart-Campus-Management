// Content.jsx
import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import PageLayout from "@/layouts/Page";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RegularCard from "@/components/cards/regulerCard";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/pieChart";
import API from "@/config/Api";
import AppContext from "@/config/AppContext";

const Skeleton = styled("div")(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

const Dashboard = () => {
    const [contextData, setContextData] = useContext(AppContext);
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    const role = contextData?.roles[contextData?.userDetails?.role_id];
    const { apiCall, loading, error } = API(role);
    const [counts , setCounts] = useState(null);

    const [chartData, setChartData] = useState({
        labels: ["03/02", "03/07", "03/10", "03/20", "03/21", "03/22", "03/27", "03/29", "03/31"],
        datasets: [
            {
                label: "Sechedules",
                data: [1, 3, 5, 2, 4, 1, 1, 4, 2],
                backgroundColor: "#fc4454",
                borderColor: "#fc4454",
            },
        ],
    });

    const fetchDashbord = async () => {
        try {
            const response = await apiCall("/count");

            if(response?.success) {
                setCounts(response?.data);
            }
        } catch (error) {
            console.log('error => ', error);
        }
    };

    useEffect(() => {
        fetchDashbord();
    }, []);

    return (
        <PageLayout dashboard={true} title={"Dashboard"}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div className="min-height-300 bg-primary-cu position-absolute w-100 position-top-left"></div>
                <Typography
                    sx={{ marginBottom: 2, marginTop: "20px", zIndex: 10 }}
                    component={"div"}
                    className="container-fluid py-4 row"
                >
                    <RegularCard counts={counts}/>

                    <Typography component={"div"} className="col-6 z-1 mt-4">
                        <LineChart
                            cardName="Total Attendance"
                            chartData={chartData}
                        />
                    </Typography>
                    <Typography component={"div"} className="col-6 z-1 mt-4">
                        <PieChart cardName="Charts" counts={counts} />
                    </Typography>
                </Typography>
            </Box>
        </PageLayout>
    );
};

export default Dashboard;
