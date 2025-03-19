import { useEffect, useState } from "react";

// others
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/config/api";
import TextInput from "@/components/inputs/TextInput";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";

const UserUpdateForm = (props) => {
    const { btnLabel, data, editUser } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: data?.username,
            email: data?.email,
            fullName: data?.fullName,
            company: data?.company,
            phone: data?.phone,
            country: data?.country,
            city: data?.city,
            zipcode: data?.zipcode,
        },

        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required"),
            fullName: Yup.string().required("Full name is required"),
        }),

        onSubmit: (values) => {
            // console.log(`values => `, values);
            if (data?.id) editUser({ ...values, id: data.id });
        },
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(`error => `, formik.errors);

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                label="Full Name"
                value={formikSignup.values.name || ""}
                getValue={(value) => formikSignup.setFieldValue("name", value)}
                error={Boolean(formikSignup.errors.name)}
                errorMsg={formikSignup.errors.name}
                classes={"mt-3"}
            />
            <TextInput
                label="Email"
                type="email"
                value={formikSignup.values.email || ""}
                getValue={(value) => formikSignup.setFieldValue("email", value)}
                error={Boolean(formikSignup.errors.email)}
                errorMsg={formikSignup.errors.email}
                classes={"mt-3"}
            />

            <TextInput
                label="Phone Number"
                type="number"
                value={formikSignup.values.mobile || ""}
                getValue={(value) =>
                    formikSignup.setFieldValue("mobile", value)
                }
                error={Boolean(formikSignup.errors.mobile)}
                errorMsg={formikSignup.errors.mobile}
                classes={"mt-3"}
            />

            <TextInput
                label="NIC"
                value={formikSignup.values.nic || ""}
                getValue={(value) => formikSignup.setFieldValue("nic", value)}
                error={Boolean(formikSignup.errors.nic)}
                errorMsg={formikSignup.errors.nic}
                classes={"mt-3"}
            />

            {/* <TextInput
                            // label="Date of Birth"
                            type="date"
                            value={formikSignup.values.dob || ""}
                            getValue={(value) =>
                                formikSignup.setFieldValue("dob", value)
                            }
                            error={Boolean(formikSignup.errors.dob)}
                            errorMsg={formikSignup.errors.dob}
                            classes={"mt-3"}
                        /> */}

            <TextInput
                label="password"
                type="password"
                value={formikSignup.values.password || ""}
                getValue={(value) =>
                    formikSignup.setFieldValue("password", value)
                }
                error={Boolean(formikSignup.errors.password)}
                errorMsg={formikSignup.errors.password}
                classes={"mt-3"}
            />

            <TextInput
                label="Confirm Password"
                type="password"
                value={formikSignup.values.password_confirmation || ""}
                getValue={(value) =>
                    formikSignup.setFieldValue("password_confirmation", value)
                }
                error={Boolean(formikSignup.errors.password_confirmation)}
                errorMsg={formikSignup.errors.password_confirmation}
                classes={"mt-3"}
            />

            <br />
            <LoadingButtonComponent
                label={btnLabel}
                variant="contained"
                loading={loading}
            />
        </form>
    );
};

export default UserUpdateForm;
