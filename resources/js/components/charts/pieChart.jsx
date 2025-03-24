import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function pieChart({ cardName, cardValue, counts }) {
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
                            { id: 0, value: counts?.studentcount, label: "Students" },
                            { id: 1, value: counts?.staffCount, label: "Staffs" },
                            { id: 2, value: counts?.coursecount, label: "Course" },
                            { id: 3, value: counts?.subjectcount, label: "Subjects" },
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
