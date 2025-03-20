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

export default function BasicModal() {
    const [open, setOpen] = useState(false);
    const [selectFeilds, setSelectFeilds] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)");
    const data = [];
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectFeildList = ["type", "block", "course", "subject", "lecturer"];

    function createSelectedFeilds() {
        let feilds = [];

        selectFeildList.map((name, index) => {
            feilds.push(
                <FormControl
                    size="small"
                    className="col-md-6 col-12 mt-3 px-2"
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
                    >
                        <MenuItem value={"1"}>A</MenuItem>
                        <MenuItem value={"2"}>B</MenuItem>
                        <MenuItem value={"3"}>C</MenuItem>
                    </Select>
                </FormControl>,
                index === 0 ? <div className="col-md-6 col-12"></div> : ""
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
            title: data?.title,
            description: data?.description,
            type: data?.password,
            block: data?.block,
            course: data?.course,
            subject: data?.subject,
            startDate: data?.startDate,
            endDate: data?.endDate,
            lecturer: data?.fullName,
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
            <Button variant="contained" onClick={handleOpen}>
                Create Schedule
            </Button>

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
                    <form onSubmit={formik.handleSubmit} key={'0'}>
                        <TextInput
                            label="Title"
                            value={formik.values.title || ""}
                            getValue={(value) =>
                                formik.setFieldValue("title", value)
                            }
                            error={Boolean(formik.errors.title)}
                            errorMsg={formik.errors.title}
                            classes={"px-2"}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={["MobileDatePicker"]}
                                size="small"
                            >
                                <div className="row date-picker">
                                    <div className="col-md-6 col-12 mt-3 px-2">
                                        <DemoItem label="Start Date">
                                            <MobileDatePicker
                                                defaultValue={dayjs(
                                                    "2022-04-17",
                                                )}
                                                sx={{
                                                    padding: "0px",
                                                }}
                                                size="small"
                                            />
                                        </DemoItem>
                                    </div>
                                    <div className="col-md-6 col-12 mt-3 px-2">
                                        <DemoItem label="End Date">
                                            <MobileDatePicker
                                                defaultValue={dayjs(
                                                    "2022-04-27",
                                                )}
                                                size="small"
                                            />
                                        </DemoItem>
                                    </div>
                                </div>
                            </DemoContainer>
                        </LocalizationProvider>
                        {selectFeilds}
                        <TextareaInput
                            id="description"
                            label="Description"
                            name="description"
                            classes={"px-2 mt-3"}
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
