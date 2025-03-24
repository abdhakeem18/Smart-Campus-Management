import * as React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    CardActionArea,
} from "@mui/material";

function RegularCard({ counts }) {
    const [selectedCard, setSelectedCard] = React.useState(0);
    const cards = [
        {
            id: 1,
            title: "Total Students",
            count: counts?.studentcount,
            description: "Total enrolled students.",
        },
        {
            id: 2,
            title: "Total Staff",
            count: counts?.staffCount,
            description: "Total number of staff members.",
        },
        {
            id: 3,
            title: "Total Courses",
            count: counts?.coursecount,
            description: "Total available courses.",
        },
        {
            id: 4,
            title: "Total Subjects",
            count: counts?.subjectcount,
            description: "Total subjects being taught.",
        },
    ];

    return (
        <Box
            className={"row w-100 pr-0"}
            sx={{
                width: "100%",
            }}
        >
            {cards.map((card, index) => (
                <Card
                    key={index}
                    className={`col-md-3 ${card.id === cards.length ? "pr-0" : ""}`}
                >
                    <CardActionArea
                        onClick={() => setSelectedCard(index)}
                        data-active={selectedCard === index ? "" : undefined}
                        className="bg-light"
                    >
                        <CardContent>
                            <Typography variant="h6">{card.title}</Typography>
                            <Typography variant="h4" color="primary">
                                {card.count}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {card.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
}

export default RegularCard;
