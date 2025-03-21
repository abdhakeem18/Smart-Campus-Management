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
    FormHelperText,
    Alert,
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
import API from "@/config/Api";
import LoadingButtonComponent from "@/components/buttons/LoadingButton";
import { errorHandle } from "@/components/common/helper";

export default function EventModal(props) {
    const { openModal, setOpenModal, selectDate, role, setUpdateCalender } =
        props;
    const [selectFeilds, setSelectFeilds] = useState("");
    const [courses, setCourses] = useState([]);
    const isMobile = useMediaQuery("(max-width:600px)");
    const [success, setSuccess] = useState("");
    const { apiCall, loading, error } = API(role);

    const data = [];

    const handleClose = () => setOpenModal(false);
    const list = { Type: ["Reservation", "Event"] };
    const [feildList, setFieldList] = useState([list]);

    async function fetchData() {
        // let blocks = apiCall("/blocks");
        let courseData = await apiCall("/courses");

        if (courseData?.success) {
            setCourses(courseData?.data);
        }
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        let data = [list];

        if (name != "Type") {
            data = [...feildList];
        }

        if (name === "Type") {
            if (value === 1) {
                const type1Block = { Block: ["E1", "E2", "E3", "E4", "E6"] };
                let blockIndex = data.findIndex((item) =>
                    item.hasOwnProperty("Block"),
                );
                if (blockIndex !== -1) {
                    data[blockIndex] = { ...data[blockIndex], ...type1Block };
                } else {
                    data.push(type1Block);
                }

                // Update course list
                const courseList = courses.map((course) => course.course_name);
                const courseIndex = data.findIndex((item) =>
                    item.hasOwnProperty("Course"),
                );
                if (courseIndex !== -1) {
                    data[courseIndex] = {
                        ...data[courseIndex],
                        Course: courseList,
                    };
                } else {
                    data.push({ Course: courseList });
                }
            } else if (value === 2) {
                const Equipments = {
                    Equipment: [
                        "Microphones",
                        "Speakers",
                        "Laptops",
                        "Projectors",
                    ],
                };
                const equipmentIndex = data.findIndex((item) =>
                    item.hasOwnProperty("Equipment"),
                );
                if (equipmentIndex !== -1) {
                    data[equipmentIndex] = {
                        ...data[equipmentIndex],
                        ...Equipments,
                    };
                } else {
                    data.push(Equipments);
                }
            }
        } else if (name === "Course") {
            const course = courses.find((course) => course.id === value);
            if (course) {
                const subjects = course.subjects.map(
                    (subject) =>
                        `${subject.subject_name} (${subject.lecture.name})`,
                );
                const subjectIndex = data.findIndex((item) =>
                    item.hasOwnProperty("Subject"),
                );
                if (subjectIndex !== -1) {
                    data[subjectIndex] = {
                        ...data[subjectIndex],
                        Subject: subjects,
                    };
                } else {
                    data.push({ Subject: subjects });
                }
            }
        } else if (name === "Subject") {
            const Equipments = {
                Equipment: ["Microphones", "Speakers", "Laptops", "Projectors"],
            };
            const equipmentIndex = data.findIndex((item) =>
                item.hasOwnProperty("Equipment"),
            );
            if (equipmentIndex !== -1) {
                data[equipmentIndex] = {
                    ...data[equipmentIndex],
                    ...Equipments,
                };
            } else {
                data.push(Equipments);
            }
        }

        if (data.length > 0) {
            setFieldList(data);
        }
    }

    function createSelectedFeilds() {
        let feilds = [];

        feildList.map((obj, index) => {
            const [name, value] = Object.entries(obj)[0];
            const formikName = (
                name === "Course"
                    ? "course_id"
                    : name === "Subject"
                      ? "subject_id"
                      : name === "Block"
                        ? "block_id"
                        : name === "Equipment"
                          ? "equipment_id"
                          : name
            ).toLowerCase();
            let num = 1;
            feilds.push(
                <FormControl
                    size="small"
                    className="col-md-6 col-12 my-2 px-1"
                    key={formikName + index}
                    error={Boolean(formik.errors[formikName])}
                >
                    <InputLabel id={`${formikName}-select-label`}>
                        {name}
                    </InputLabel>
                    <Select
                        key={formikName + index}
                        labelId={`${formikName}-select-label`}
                        id={`${formikName}-select`}
                        value={formik.values[formikName] || ""}
                        label={name}
                        name={name}
                        required={name === "Equipment" ? false : true}
                        onChange={(e) => {
                            formik.setFieldValue(formikName, e.target.value);
                            handleChange(e);
                        }}
                        // className="mx-1"
                    >
                        {value.map((option, index) => {
                            return (
                                <MenuItem value={num++} key={option + index}>
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {formik.touched[formikName] &&
                        formik.errors[formikName] && (
                            <FormHelperText>
                                {formik.errors[formikName]}
                            </FormHelperText>
                        )}
                </FormControl>
            );
        });

        setSelectFeilds(feilds);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            description: "",
            date: selectDate,
            start_time: "",
            end_time: "",
            type: "",
            user_id: "",
            course_id: "",
            subject_id: "",
            block_id: "",
            location: "",
            equipment_id: "",
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            type: Yup.string().required("Type is required"),
            date: Yup.string().required("StartDate is required"),
            start_time: Yup.string().required("StartTime is required"),
            end_time: Yup.string().required("EndTime is required"),
            description: Yup.string().required("Description is required"),
        }),

        onSubmit: (values, actions) => {
            handleSubmit(values, actions);
        },
    });

    const handleSubmit = async (values, { resetForm }) => {
        setSuccess("");
        const response = await apiCall("/schedules", "POST", values);

        if (response?.success) {
            setSuccess(response?.message);

            setTimeout(() => {
                setUpdateCalender(true);
                resetAllData();
                resetForm();
                setOpenModal(false);
            }, 2000);
        }
    };

    const resetAllData = () => {
        setFieldList([list]);
        setSuccess("");
    };

    useEffect(() => {
        createSelectedFeilds();
    }, [formik.values]);

    useEffect(() => {
        fetchData();
    }, [role]);

    return (
        <>
            <Modal
                open={openModal}
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
                    {formik?.errors && console.log(formik.errors)}
                    <form onSubmit={formik.handleSubmit}>
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
                                                    formik?.values?.date,
                                                )}
                                                minDate={dayjs()}
                                                sx={{
                                                    padding: "0px",
                                                }}
                                                size="small"
                                                onChange={(newValue) =>
                                                    formik.setFieldValue(
                                                        "date",
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
                                                formik?.values?.start_time
                                                    ? dayjs(
                                                          formik.values
                                                              .start_time,
                                                          "HH:mm:ss",
                                                      )
                                                    : null
                                            }
                                            onChange={(newValue) => {
                                                const formattedTime = newValue
                                                    ? newValue.format(
                                                          "HH:mm:ss",
                                                      )
                                                    : null;
                                                formik.setFieldValue(
                                                    "start_time",
                                                    formattedTime,
                                                );

                                                // If End Time is before Start Time, reset End Time
                                                if (
                                                    formik?.values?.end_time &&
                                                    newValue &&
                                                    newValue.isAfter(
                                                        dayjs(
                                                            formik.values
                                                                .end_time,
                                                            "HH:mm:ss",
                                                        ),
                                                    )
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
                                                formik?.values?.end_time
                                                    ? dayjs(
                                                          formik.values
                                                              .end_time,
                                                          "HH:mm:ss",
                                                      )
                                                    : null
                                            }
                                            onChange={(newValue) => {
                                                const formattedTime = newValue
                                                    ? newValue.format(
                                                          "HH:mm:ss",
                                                      )
                                                    : null;
                                                formik.setFieldValue(
                                                    "end_time",
                                                    formattedTime,
                                                );

                                                // If Start Time is after End Time, reset End Time
                                                if (
                                                    formik?.values
                                                        ?.start_time &&
                                                    newValue &&
                                                    newValue.isBefore(
                                                        dayjs(
                                                            formik.values
                                                                .start_time,
                                                            "HH:mm:ss",
                                                        ),
                                                    )
                                                ) {
                                                    formik.setFieldValue(
                                                        "end_time",
                                                        null,
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </DemoContainer>
                        </LocalizationProvider>
                        {selectFeilds}
                        {formik.values.type === 2 && (
                            <TextInput
                                id="location"
                                label="Location"
                                name="location"
                                classes={" mt-3"}
                                value={formik.values.location || ""}
                                getValue={(value) =>
                                    formik.setFieldValue("location", value)
                                }
                                placeholder=""
                            />
                        )}

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

                        <br />
                        {success && <Alert severity="success">{success}</Alert>}

                        {error && (
                            <>
                                <Alert severity="error">
                                    {errorHandle(error)}
                                </Alert>
                            </>
                        )}
                        <Box textAlign="center" mt={2} mb={2}>
                            <LoadingButtonComponent
                                label={"Create Schedule"}
                                variant="contained"
                                loading={loading}
                                cls={"my-3"}
                                fullWidth={true}
                            />
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
