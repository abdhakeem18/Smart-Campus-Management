import { useEffect, useState } from "react";

// others
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/config/Api";
import TextInput from "@/components/inputs/TextInput";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import SelectInput from "@/components/inputs/SelectInput";
import { Typography, Box, Alert } from "@mui/material";

const UserForm = (props) => {
    const { closeModal, btnLabel, data, updateUserTable } = props;
    const { apiCall, loading, error } = API("admin");
    const [success, setSuccess] = useState("");

    const userType = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Staff" },
        { id: 3, name: "Student" },
    ];

    async function handleSubmit(values) {
        try {
            setSuccess("");
            const response = await apiCall("/users", "POST", values);

            if (response?.success) {
                setSuccess(response?.message);
                updateUserTable(true);
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            mobile: "",
            role_id: "",
            nic: "",
            image: "",
            is_active: 1,
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            mobile: Yup.string().required("Required"),
            nic: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            password_confirmation: Yup.string().required("Required"),
        }),

        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const errorHandle = () => {
        return Object.entries(error.data).map(([key, value]) => (
            <div key={key}>
                <strong>{key}:</strong>
                <ul>
                    {value.map((errorMsg, index) => (
                        <li key={index}>{errorMsg}</li>
                    ))}
                </ul>
            </div>
        ));
    }

    return (
        <form onSubmit={formik.handleSubmit} className="user-form">
            {success && <Alert severity="success">{success}</Alert>}

            {error && (
                <>
                    <Alert severity="error">
                        {errorHandle()}
                    </Alert>
                </>
            )}
            <TextInput
                label="Full Name"
                value={formik.values.name || ""}
                getValue={(value) => formik.setFieldValue("name", value)}
                error={Boolean(formik.errors.name)}
                errorMsg={formik.errors.name}
                classes={"mt-4"}
            />
            <TextInput
                label="Email"
                type="email"
                value={formik.values.email || ""}
                getValue={(value) => formik.setFieldValue("email", value)}
                error={Boolean(formik.errors.email)}
                errorMsg={formik.errors.email}
                classes={"my-4"}
            />

            <SelectInput
                label="User Type"
                value={formik.values.role_id || ""}
                getValue={(value) => formik.setFieldValue("role_id", value)}
                data={userType}
                error={Boolean(formik.errors.role_id)}
                errorMsg={formik.errors.role_id}
                classes={"my-3"}
            />

            <TextInput
                label="Phone Number"
                type="number"
                value={formik.values.mobile || ""}
                getValue={(value) => formik.setFieldValue("mobile", value)}
                error={Boolean(formik.errors.mobile)}
                errorMsg={formik.errors.mobile}
                classes={"mt-4"}
            />

            <TextInput
                label="NIC"
                value={formik.values.nic || ""}
                getValue={(value) => formik.setFieldValue("nic", value)}
                error={Boolean(formik.errors.nic)}
                errorMsg={formik.errors.nic}
                classes={"mt-4"}
            />

            <TextInput
                label="password"
                type="password"
                value={formik.values.password || ""}
                getValue={(value) => formik.setFieldValue("password", value)}
                error={Boolean(formik.errors.password)}
                errorMsg={formik.errors.password}
                classes={"mt-4"}
            />

            <TextInput
                label="Confirm Password"
                type="password"
                value={formik.values.password_confirmation || ""}
                getValue={(value) =>
                    formik.setFieldValue("password_confirmation", value)
                }
                error={Boolean(formik.errors.password_confirmation)}
                errorMsg={formik.errors.password_confirmation}
                classes={"mt-4"}
            />

            <br />
            <Box textAlign="center" mt={2} mb={2}>
                <LoadingButtonComponent
                    label={btnLabel}
                    variant="contained"
                    loading={loading}
                    cls={"my-3"}
                    fullWidth={true}
                />
            </Box>
        </form>
    );
};

export default UserForm;
