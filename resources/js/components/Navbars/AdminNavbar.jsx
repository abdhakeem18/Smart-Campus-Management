import React, { useEffect, useState } from "react";
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
    ListItemButton,
    ListItemText,
    Card,
    CardContent,
    Avatar,
    Button,
    useTheme,
    ListItemIcon,
    Divider,
} from "@mui/material";

import AppointmentNotifications from "./Notification";

import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Person,
    Logout,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = ({ setOpen, open, scrolled, title }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
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
                                width: drawerWidth,
                            }}
                            role="presentation"
                            onClick={toggleDrawer(anchor, false)}
                            onKeyDown={toggleDrawer(anchor, false)}
                        >
                            <List>
                                <ListItem key={"profile-card"}>
                                    <Card sx={{ display: "flex" }}>
                                        <Avatar
                                            alt="Travis Howard"
                                            src="/static/images/avatar/2.jpg"
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    flex: "1 0 auto",
                                                    padding: "0px 0px 0px 10px",
                                                }}
                                            >
                                                <Typography
                                                    component="div"
                                                    variant="h5"
                                                >
                                                    Live From Space
                                                </Typography>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="div"
                                                    sx={{
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    Mac Miller
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </ListItem>

                                <ListItem key={"profile"} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Person />
                                        </ListItemIcon>
                                        <ListItemText primary={"profile"} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        fullWidth
                                        sx={{marginTop: "20px"}}
                                    >
                                        Logout
                                    </Button>
                                </ListItem>
                            </List>
                        </Box>
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
        </AppBar>
    );
};

export default Navbar;
