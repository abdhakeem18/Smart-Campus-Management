import { React, useState, useEffect } from "react";
import {
    styled,
    useTheme,
    Drawer as MuiDrawer,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import {
    Dashboard,
    Event,
    Schedule,
    People,
    School,
    AssignmentTurnedIn,
    BarChart,
    Settings,
    ChevronLeft
  } from "@mui/icons-material";

export default function Sidebar({ setOpen, open, scrolled }) {
    const drawerWidth = 240;

    const menuList = [
        { name: "Dashboard", icon: <Dashboard /> },
        { name: "Events", icon: <Event /> },
        { name: "Schedules", icon: <Schedule /> },
        { name: "Users", icon: <People /> },
        { name: "Course", icon: <School /> },
        { name: "Attendance Tracking", icon: <AssignmentTurnedIn /> },
        { name: "Reports & Analytics", icon: <BarChart /> },
        { name: "System Settings", icon: <Settings /> },
      ];

    const openedMixin = (theme) => ({
        width: drawerWidth,
        margin: "15px 0px 0px 20px",
        border: "1px solid #dfdfdf",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        margin: "15px 0px 0px 20px",
        border: "1px solid #dfdfdf",
        overflowX: "hidden",
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up("sm")]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    "& .MuiDrawer-paper": openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    "& .MuiDrawer-paper": closedMixin(theme),
                },
            },
        ],
    }));

    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            variant="permanent"
            open={open}
            className={`cu-SideBar ${scrolled ? "sitebar-adjustment" : ""}`}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {open ? <ChevronLeft /> : ""}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menuList.map((menuItem, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                          justifyContent: "initial",
                                      }
                                    : {
                                          justifyContent: "center",
                                      },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: "center",
                                    },
                                    open
                                        ? {
                                              mr: 3,
                                          }
                                        : {
                                              mr: "auto",
                                          },
                                ]}
                            >
                                {menuItem.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={menuItem.name}
                                sx={[
                                    open
                                        ? {
                                              opacity: 1,
                                          }
                                        : {
                                              opacity: 0,
                                          },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
