import React, { useEffect, useState } from "react";
import { extendTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbars/AdminNavbar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const AdminLayout = ({ children }) => {
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

                <Navbar setOpen={setOpen} open={open} scrolled={scrolled} />
                <Sidebar setOpen={setOpen} open={open} scrolled={scrolled} />

                {children}
            </Box>
        </ThemeProvider>
    );
};

export default AdminLayout;
