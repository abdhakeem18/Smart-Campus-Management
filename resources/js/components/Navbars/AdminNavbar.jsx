import React, { useEffect, useState } from "react";
import {
    styled,
    useTheme,
    Toolbar,
    Typography,
    List,
    ListItem,
    IconButton,
    Box,
    InputBase,
    Menu,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";

const Navbar = ({ setOpen, open, scrolled }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const drawerWidth = 260;
    const title = "dashbord";
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

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <AppBar
            position="fixed"
            open={open}
            className="cu-SideBar"
            sx={scrolled ? {backgroundColor: "#fff", boxShadow: "var(--Paper-shadow)", marginTop: "0px"} : ""}
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
                    <IconButton
                        onClick={handleProfileClick}
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
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileClose}
                        className={"profile-menu"}
                    >
                        <MenuItem onClick={handleProfileClose}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleProfileClose}>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
