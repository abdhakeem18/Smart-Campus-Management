import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    useMediaQuery,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import TextInput from "@/components/inputs/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextareaInput from "@/components/inputs/TextareaInput";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicModal(props) {
    const { open, setOpen, selectDate } = props;
    const [selectFeilds, setSelectFeilds] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)");
    const data = [];

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectFeildList = [
        { type: ["reservation", "event", "workspace"] },
        { block: [] },
        { course: [] },
        { subject: [] },
        { lecturer: [] },
    ];

    function createSelectedFeilds() {
        let feilds = [];

        selectFeildList.map((obj, index) => {
            const [name, value] = Object.entries(obj)[0];
            feilds.push(
                <FormControl
                    size="small"
                    className="col-md-6 col-12 my-2"
                    key={name}
                >
                    <InputLabel id={`${name}-select-label`}>{name}</InputLabel>
                    <Select
                        labelId={`${name}-select-label`}
                        id={`${name}-select`}
                        value={formik.values[name] || ""}
                        label={name}
                        onChange={(e) =>
                            formik.setFieldValue(name, e.target.value)
                        }
                        className="mx-1"
                    >
                        {value.map((option, index) => { 
                           return <MenuItem value={index}>{option}</MenuItem>
                        })}
                    </Select>
                </FormControl>,
                index === 0 ? <div className="col-md-6 col-12"></div> : "",
            );
        });

        setSelectFeilds(feilds);
    }

    // Formik Functions
    async function handleSubmit(values) {
        try {
            // setLoading(true);
            handleClose();

            const payload = {
                ...values,
            };

            // console.log(`payload => `, payload);

            // const apiv = API("v2");
            // const res = await apiv.post("/users", payload);
            // handleUser(res.data);

            // setTimeout(() => {
            //     setLoading(false);
            //     closeModal();
            // }, 2000);
        } catch (error) {
            // setLoading(false);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            description: "",
            type: "",
            block: "",
            course: "",
            subject: "",
            startDate: selectDate,
            lecturer: "",
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            // type: Yup.string().required("Type is required"),
            // lecturer: Yup.string().required("Lecturer is reequired"),
            // startDate: Yup.string().required("StartDate is required"),
            // endtDate: Yup.string().required("EndDate is required"),
        }),

        onSubmit: (values) => {
            console.log("values => ", values);
            // else handleSubmit(values);
        },
    });

    useEffect(() => {
        createSelectedFeilds();
    }, [formik.values]);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <Box
                    className={"basic-modal"}
                    sx={{
                        transform: "translate(-50%, -50%)",
                        width: isMobile ? "90%" : "700px",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
                        Create New Schedule
                    </Typography>
                    <form onSubmit={formik.handleSubmit} key={"basic-pop"}>
                        <TextInput
                            label="Title"
                            value={formik.values.title || ""}
                            getValue={(value) =>
                                formik.setFieldValue("title", value)
                            }
                            error={Boolean(formik.errors.title)}
                            errorMsg={formik.errors.title}
                            classes={""}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    "MobileDatePicker",
                                    "TimePicker",
                                    "TimePicker",
                                ]}
                                size="small"
                            >
                                <div className="row date-picker">
                                    <div className="col-md-6 col-12 my-3 px-1">
                                        <DemoItem label="Start Date">
                                            <MobileDatePicker
                                                defaultValue={dayjs(
                                                    formik?.values?.startDate,
                                                )}
                                                minDate={dayjs()}
                                                sx={{
                                                    padding: "0px",
                                                }}
                                                size="small"
                                                onChange={(newValue) =>
                                                    formik.setFieldValue(
                                                        "startDate",
                                                        newValue,
                                                    )
                                                }
                                            />
                                        </DemoItem>
                                    </div>
                                </div>
                                <div className="row time-picker">
                                    <div className="col-md-6 col-12 mb-3 px-1">
                                        <TimePicker
                                            label="Start Time"
                                            size="small"
                                            value={
                                                formik?.values?.start_time ||
                                                null
                                            }
                                            onChange={(newValue) => {
                                                formik.setFieldValue(
                                                    "start_time",
                                                    newValue,
                                                );
                                                // If End Time is before Start Time, reset it
                                                if (
                                                    formik?.values?.end_time &&
                                                    newValue >
                                                        formik.values.end_time
                                                ) {
                                                    formik.setFieldValue(
                                                        "end_time",
                                                        null,
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-12 mb-3 px-1">
                                        <TimePicker
                                            label="End Time"
                                            size="small"
                                            value={
                                                formik?.values?.end_time || null
                                            }
                                            onChange={(newValue) => {
                                                if (
                                                    formik?.values
                                                        ?.start_time &&
                                                    newValue <
                                                        formik.values.start_time
                                                ) {
                                                    alert(
                                                        "End time cannot be earlier than start time!",
                                                    );
                                                } else {
                                                    formik.setFieldValue(
                                                        "end_time",
                                                        newValue,
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </DemoContainer>
                        </LocalizationProvider>
                        {selectFeilds}
                        <TextareaInput
                            id="description"
                            label="Description"
                            name="description"
                            classes={" mt-3"}
                            value={formik.values.description || ""}
                            getValue={(value) =>
                                formik.setFieldValue("description", value)
                            }
                            placeholder=""
                            required
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
