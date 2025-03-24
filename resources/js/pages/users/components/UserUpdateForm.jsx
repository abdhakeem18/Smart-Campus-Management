import { useEffect, useState } from "react";

// others
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/config/Api";
import TextInput from "@/components/inputs/TextInput";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import SelectInput from "@/components/inputs/SelectInput";
import { Typography, Box, Alert } from "@mui/material";
import FileUploadInput from "@/components/inputs/FileUploadInput";
import { errorHandle } from "@/components/common/helper";

const UserForm = (props) => {
    const { closeModal, btnLabel, data, updateUserTable } = props;
    const { apiCall, loading, error } = API("admin");
    const [success, setSuccess] = useState("");

    const userType = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Staff" },
        { id: 3, name: "Student" },
    ];

    const profileImagePath = `/storage/images/profile/`;

    async function handleSubmit(values) {
        try {
            setSuccess("");

            const response = await apiCall(`/users/${data?.id}`, "PUT", values);

            if (response?.success) {
                setSuccess(response?.message);
                updateUserTable(true);

                setTimeout(() => {
                    closeModal();
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: data?.name,
            email: data?.email,
            mobile: data?.mobile,
            role_id: data?.role_id,
            image: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            mobile: Yup.string().required("Required"),
            // nic: Yup.string().required("Required"),
        }),

        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="user-form">
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
                classes={""}
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

            <Typography component={"div"}>
                <FileUploadInput
                    type={"image"}
                    title={"Profile"}
                    allowedExtension={["jpg", "png", "jpeg"]}
                    fileName={data?.image || ""}
                    previewLink={profileImagePath + data?.image || ""}
                    getValue={(value) => console.log(value)}
                    error={Boolean(formik.errors.image)}
                    errorMsg={formik.errors.image}
                />
            </Typography>

            <br />
            {success && <Alert severity="success">{success}</Alert>}

            {error && (
                <>
                    <Alert severity="error">{errorHandle(error)}</Alert>
                </>
            )}
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
