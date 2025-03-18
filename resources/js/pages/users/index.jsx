import React, { useEffect, useState } from "react";
import AdminLayout from "@/layouts/Admin";
import GroupIcon from "@mui/icons-material/Group";
import {
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Tooltip,
    Box,
} from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
// import API from "../../../config/api";
// import { json } from "react-router-dom";
import ModalComponent from "./components/Modal";
import UserForm from "./components/user-form";
import UserUpdateForm from "./components/user-update-form";

//MUI Icons
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";
// import TopupForm from "../profile/components/TopupForm";

const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "username", label: "Username", minWidth: 100 },
    { id: "fullName", label: "Full Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
];

const Users = () => {
    const [user, setUser] = useState("");
    const [modalOptions, setModalOptions] = useState({
        open: false,
        title: "",
        data: {},
        formName: "",
    });
    const showModal = (title, data, formName) => {
        setModalOptions({
            open: true,
            title,
            data,
            formName,
        });
    };
    const resetModalOptions = () => {
        setModalOptions({
            open: false,
            title: "",
            data: {},
            formName: "",
        });
    };

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    //   async function fetchUsers() {
    //     setLoading(true);
    //     const apiv = API("v2");
    //     const res = await apiv.get("/users");

    //     // Wait for both the fetch promise and a 2 second timeout
    //     const results = await Promise.all([
    //       res,
    //       new Promise((resolve) => setTimeout(resolve, 1500)),
    //     ]);

    //     setUsers(res.data);
    //     setLoading(false);
    //   }

    //   useEffect(() => {
    //     fetchUsers();

    //     return () => {
    //       fetchUsers();
    //     };
    //   }, []);

    //   const editUser = async (user) => {
    //     // console.log("user => ", user);
    //     const apiv = API("v2");
    //     await apiv.put("/users/" + user.id, user);

    //     const updatedUsers = users.map((usr) => {
    //       if (usr.id === user.id) {
    //         return { ...usr, ...user };
    //       }
    //       return usr;
    //     });

    //     setUsers(updatedUsers);
    //     resetModalOptions();
    //   };

    return (
        <AdminLayout>
            <Paper
                className="user-table border-4"
                sx={{ width: "100%", overflow: "hidden", boxShadow: 0 }}
            >
                <div className="m-3 text-end">
                    <Button
                        variant="contained"
                        onClick={() =>
                            showModal("Create New User", {}, "create-user")
                        }
                    >
                        Create User
                    </Button>
                </div>

                <CommonTable
                    columns={columns}
                    rows={users}
                    handleEdit={(data) =>
                        showModal(
                            `Update user - ${data.name}`,
                            data,
                            "update-user",
                        )
                    }
                >
                    <>
                        <Tooltip title="Topup">
                            <IconButton
                                onClick={() => showModal(`Topup`, {}, "top-up")}
                            >
                                <PriceChangeRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                </CommonTable>
            </Paper>

            <ModalComponent
                formTitle={modalOptions.title}
                open={modalOptions.open}
                closeModal={resetModalOptions}
            >
                {modalOptions.formName === "create-user" ? (
                    <UserForm
                        data={modalOptions.data}
                        closeModal={resetModalOptions}
                        handleUser={(user) => setUsers([user, ...users])}
                        btnLabel={modalOptions.data?.id ? "Update" : "Add"}
                    />
                ) : null}

                {modalOptions.formName === "update-user" ? (
                    <UserUpdateForm
                        data={modalOptions.data}
                        handleUser={(user) => setUsers([user, ...users])}
                        btnLabel={modalOptions.data?.id ? "Update" : "Add"}
                        editUser={editUser}
                    />
                ) : null}

                {modalOptions.formName === "top-up" ? (
                    <TopupForm
                        setUser={setUser}
                        closeModal={resetModalOptions}
                    />
                ) : null}
            </ModalComponent>
        </AdminLayout>
    );
};

export default Users;
