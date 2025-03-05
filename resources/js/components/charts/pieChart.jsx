import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function pieChart({ cardName, cardValue, cardAction, chartData }) {
    return (
        <Card className="p-2 flex-fill">
            <CardContent>
                <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                    fontWeight="bolder"
                    marginBottom={3}
                >
                    {cardName}
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    marginBottom={2}
                >
                    {cardValue}
                </Typography>
            </CardContent>

            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: "series A" },
                            { id: 1, value: 15, label: "series B" },
                            { id: 2, value: 20, label: "series C" },
                        ],
                    },
                ]}
                width={400}
                height={200}
                className="stu-pieChart"
            />

            <br />
            <br />
        </Card>
    );
}
