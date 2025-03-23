import React, { useEffect, useState } from "react";
import { extendTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbars/AdminNavbar";
import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const PageLayout = ({ children, dashboard = false, title }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const theme = extendTheme({
        palette: {
            primary: { main: "#1976d2" },
            secondary: { main: "#ff4081" },
            background: { default: "#f4f6f8" },
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <Navbar setOpen={setOpen} open={open} scrolled={scrolled} title={title}/>
                <Sidebar setOpen={setOpen} open={open} scrolled={scrolled} />
                {dashboard ? (
                    children 
                ) : (
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <div className="min-height-300 bg-primary-cu position-absolute w-100 position-top-left"></div>
                        <Container
                            sx={{ mt: 4, mb: 4 }}
                            className="calender-container"
                        >
                            {children}
                        </Container>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default PageLayout;
