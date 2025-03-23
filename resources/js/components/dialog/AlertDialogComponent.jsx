import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
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
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p dangerouslySetInnerHTML={{ __html: desc }} />
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
