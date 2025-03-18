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
      <div className="d-flex gap-2">
        <div className="mb-3 w-100">
          <TextInput
            label="Username"
            value={formik.values.username}
            getValue={(value) => formik.setFieldValue("username", value)}
            error={Boolean(formik.errors.username)}
            errorMsg={formik.errors.username}
          />
        </div>
        <div className="mb-3 w-100">
          <TextInput
            label="Email"
            type="email"
            value={formik.values.email}
            getValue={(value) => formik.setFieldValue("email", value)}
            error={Boolean(formik.errors.email)}
            errorMsg={formik.errors.email}
          />
        </div>
      </div>
      <div className="d-flex gap-2">
        <div className="mb-3 w-100">
          <TextInput
            label="Full Name"
            value={formik.values.fullName}
            getValue={(value) => formik.setFieldValue("fullName", value)}
            error={Boolean(formik.errors.fullName)}
            errorMsg={formik.errors.fullName}
          />
        </div>
        <div className="mb-3 w-100">
          <TextInput
            label="Company"
            value={formik.values.company}
            getValue={(value) => formik.setFieldValue("company", value)}
            error={Boolean(formik.errors.company)}
            errorMsg={formik.errors.company}
          />
        </div>
      </div>
      <div className="d-flex gap-2">
        <div className="mb-3 w-100">
          <TextInput
            label="Phone"
            value={formik.values.phone}
            getValue={(value) => formik.setFieldValue("phone", value)}
            error={Boolean(formik.errors.phone)}
            errorMsg={formik.errors.phone}
          />
        </div>

        <div className="mb-3 w-100">
          <TextInput
            label="City"
            value={formik.values.city}
            getValue={(value) => formik.setFieldValue("city", value)}
            error={Boolean(formik.errors.city)}
            errorMsg={formik.errors.city}
          />
        </div>
      </div>
      <div className="d-flex gap-2">
        <div className="mb-3 w-100">
          <TextInput
            label="Country"
            value={formik.values.country}
            getValue={(value) => formik.setFieldValue("country", value)}
            error={Boolean(formik.errors.country)}
            errorMsg={formik.errors.country}
          />
        </div>
        <div className="mb-3 w-100">
          <TextInput
            label="ZIP Code"
            value={formik.values.zipcode}
            getValue={(value) => formik.setFieldValue("zipcode", value)}
            error={Boolean(formik.errors.zipcode)}
            errorMsg={formik.errors.zipcode}
          />
        </div>
      </div>

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
