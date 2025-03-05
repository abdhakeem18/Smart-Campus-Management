import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextInput from "../inputs/TextInput";
import { useFormik } from "formik";
import DatePickers from "../datePicker/datePicker";
import * as Yup from "yup";

export default function AlertDialog(props) {
  const {
    title,
    open,
    closeDialog,
    handleConfirm,
    desc,
    reasonField,
    inputLable,
    type,
    data,
  } = props;
  // console.log('data12 => ', data);
  const [checkoutKeys, setCheckoutKeys] = useState({
    datetime: {
      closing_time: "17:00",
      opening_time: "8:00",
      date: data?.pickup_date,
    },
    error: true,
    error_text: "",
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // console.log(`ok => `, values);
      // handleSubmit(values);
    },
  });

  return (
    <>
      {/* {console.log("checkoutKeys12 => ", checkoutKeys)} */}
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={type === "Schedule" ? true : false}
        // in={props.open}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p dangerouslySetInnerHTML={{ __html: desc }} />
          </DialogContentText>
          {type === "Schedule" && (
            <DatePickers
              data={data}
              checkoutKeys={checkoutKeys}
              setCheckoutKeys={setCheckoutKeys}
            />
          )}
          {title != "Delete" &&
          type != "cancel" &&
          type != "Schedule" &&
          reasonField ? (
            <TextInput
              label={
                inputLable
                  ? "The reason for the rejection?"
                  : "The reason for the request?"
              }
              value={formik?.values?.reason}
              getValue={(value) => {
                formik.setFieldValue("reason", value);
              }}
              error={Boolean(formik?.errors?.reason)}
              errorMsg={formik?.errors?.reason}
              multiline
              rows={3}
            />
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          {/* {console.log('type => ', (type != "delete" && type != "accept"))} */}
          {(reasonField || type != "request") && (
            <Button
              color="error"
              onClick={() => {
                checkoutKeys?.datetime?.opening_time &&
                checkoutKeys?.datetime?.closing_time &&
                checkoutKeys?.error === false
                  ? handleConfirm(checkoutKeys)
                  : type != "delete" && type != "accept" && type != "cancel"
                  ? formik?.values?.reason != "" &&
                    handleConfirm(formik?.values?.reason)
                  : handleConfirm();
              }}
              autoFocus
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
