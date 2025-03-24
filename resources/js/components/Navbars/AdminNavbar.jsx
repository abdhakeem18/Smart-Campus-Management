import React, { useEffect, useState, useContext } from "react";
import {
    styled,
    Toolbar,
    Typography,
    List,
    ListItem,
    IconButton,
    Box,
    InputBase,
    AppBar as MuiAppBar,
    SwipeableDrawer,
    Avatar,
    Button,
    useTheme,
    Divider,
} from "@mui/material";

import AppointmentNotifications from "./Notification";
import AppContext from "@/config/AppContext";

import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Logout,
    Email,
    Phone,
    School,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import API from "@/config/Api";

const Navbar = ({ setOpen, open, scrolled, title }) => {
    const [contextData, setContextData] = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const { apiCall, loading, error } = API("web");
    const navigate = useNavigate();
    const [state, setState] = useState({
        right: false,
    });
    const anchor = "right";
    const theme = useTheme();

    const drawerWidth = 260;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        marginTop: "15px",
        background: "transparent",
        color: "#000",
        boxShadow: "none",
        width: `calc(100% - 20px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    marginLeft: drawerWidth,
                    width: `calc(100% - ${drawerWidth}px)`,
                    transition: theme.transitions.create(["width", "margin"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleLogout = async () => {
        const response = await apiCall("/logout");

        localStorage.removeItem("user-data");

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <AppBar
            position="fixed"
            open={open}
            className="cu-SideBar"
            sx={
                scrolled
                    ? {
                          backgroundColor: "#fff",
                          boxShadow: "var(--Paper-shadow)",
                          marginTop: "0px",
                      }
                    : ""
            }
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                        {
                            marginRight: 5,
                        },
                        open && { display: "none" },
                    ]}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component={"div"}>
                    <List
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: 0,
                            mb: 1,
                            bgcolor: "transparent",
                        }}
                    >
                        <ListItem sx={{ p: 0 }}>
                            <Typography variant="body2" color="text.secondary">
                                <Link
                                    to="#"
                                    style={{
                                        textDecoration: "none",
                                        color: scrolled ? "#000" : "#fff",
                                    }}
                                >
                                    Pages
                                </Link>
                            </Typography>
                        </ListItem>
                        <Typography variant="body2" color="text.secondary">
                            {" "}
                            /{" "}
                        </Typography>
                        <ListItem sx={{ p: 0 }}>
                            <Typography
                                variant="body2"
                                color={scrolled ? "#000" : "#fff"}
                            >
                                {title}
                            </Typography>
                        </ListItem>
                    </List>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color={scrolled ? "#000" : "#fff"}
                        sx={{ mb: 0 }}
                    >
                        {title}
                    </Typography>
                </Typography>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            maxWidth: 400,
                            width: "100%",
                        }}
                    >
                        <InputBase
                            placeholder="Search…"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                borderRadius: 2,
                                paddingLeft: 2,
                                paddingRight: 2,
                                width: "100%",
                            }}
                        />
                        <IconButton
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                padding: "0.5rem",
                            }}
                            onClick={() =>
                                alert(`Searching for: ${searchQuery}`)
                            }
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Profile Dropdown */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AppointmentNotifications />
                    <IconButton
                        onClick={toggleDrawer(anchor, true)}
                        color="inherit"
                        aria-label="profile"
                    >
                        <img
                            src="https://randomuser.me/api/portraits/men/45.jpg"
                            alt="Profile"
                            style={{
                                borderRadius: "50%",
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                            }}
                        />
                    </IconButton>
                </Box>
            </Toolbar>

            <div>
                <React.Fragment key={anchor}>
                    <SwipeableDrawer
                        anchor={anchor}
                        className="right-drawer"
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        <Box
                            sx={{
                                width: 320,
                                p: 3,
                                textAlign: "center",
                                position: "relative",
                            }}
                            role="presentation"
                        >
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    mb: 2,
                                    mx: "auto",
                                }}
                            >
                                P
                            </Avatar>

                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                {contextData?.userDetails?.name}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 14 }}>
                                <School />{" "}
                                {
                                    contextData?.userDetails?.students[0][
                                        "courses"
                                    ][0].course_name
                                }
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                Welcome to the Smart Campus Management System
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="body2" sx={{ fontSize: 14 }}>
                                <Email /> {contextData?.userDetails?.email}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mt: 1, fontSize: 14 }}
                            >
                                <Phone color="error" />{" "}
                                {contextData?.userDetails?.mobile}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                    mt: 3,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    sx={{ marginTop: "20px" }}
                                    onClick={handleLogout}
                                >
                                    <Logout /> Logout
                                </Button>
                            </Box>
                        </Box>
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
        </AppBar>
    );
};

export default Navbar;
