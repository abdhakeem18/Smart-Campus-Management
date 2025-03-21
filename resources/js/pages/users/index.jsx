import React, { useEffect, useState } from "react";
import AdminLayout from "@/layouts/Admin";
import {
    Button,
    Paper,
} from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import API from "@/config/api";
import ModalComponent from "@/components/modals/Modal";
import UserForm from "./components/UserForm";
import UserUpdateForm from "./components/UserUpdateForm";
import ProfileView from "./components/ProfileView";

const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "fullName", label: "Full Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "role", label: "Role", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", maxWidth: 100, align: "right" },
];

const Users = () => {
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

    const [users, setUsers] = useState([]);
    const [updateUserTable, setUpdateUserTable] = useState(true);
    const { apiCall, loading, apiError } = API("admin");

    async function fetchUsers() {
        const response = await apiCall("/users");

        if (response?.success) {
            let userList = [];
            (response?.data).map((user) => {
                userList.push({
                    id: user?.id,
                    fullName: user?.name,
                    email: user?.email,
                    role:
                        user?.role_id === 3
                            ? "Student"
                            : user?.role_id === 2
                              ? "Staff"
                              : "Admin",
                    status: user?.is_active ? "Accepted" : "Pending",
                });
            });

            setUsers(userList);
        }
    }

    useEffect(() => {
        console.log(updateUserTable);
        if (updateUserTable) {
            fetchUsers();

            setUpdateUserTable(false);

            return () => {
                fetchUsers();
            };
        }
    }, [updateUserTable]);

    async function handleAction(action, selectedRow) {
        if (action === "Edit" || action === "View") {
            const response = await apiCall(`/users/${selectedRow.id}`);

            if (response?.success) {
                if (action === "Edit")
                    showModal("Update New User", response?.data, "update-user");
                else showModal("User Details", response?.data, "user-details");
            }
        }
    }

    return (
        <AdminLayout title={"Users"}>
            <Paper
                className="user-table border-4"
                sx={{ width: "100%", overflow: "hidden", boxShadow: 0 }}
            >
                <div className="m-3 text-end">
                    <Button
                        variant="contained"
                        onClick={() =>
                            showModal("Create User", {}, "create-user")
                        }
                    >
                        Create User
                    </Button>
                </div>

                <CommonTable
                    columns={columns}
                    rows={users}
                    handleAction={handleAction}
                    tableType="user"
                    extMenuItems={["View"]}
                ></CommonTable>
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
                        btnLabel={modalOptions.data?.id ? "Update" : "Add"}
                        updateUserTable={setUpdateUserTable}
                    />
                ) : null}

                {modalOptions.formName === "update-user" ? (
                    <UserUpdateForm
                        data={modalOptions.data}
                        closeModal={resetModalOptions}
                        btnLabel={modalOptions.data?.id ? "Update" : "Add"}
                        updateUserTable={setUpdateUserTable}
                    />
                ) : null}

                {modalOptions.formName === "user-details" ? (
                    <ProfileView
                        data={modalOptions.data}
                        closeModal={resetModalOptions}
                        updateUserTable={setUpdateUserTable}
                    />
                ) : null}
            </ModalComponent>
        </AdminLayout>
    );
};

export default Users;
