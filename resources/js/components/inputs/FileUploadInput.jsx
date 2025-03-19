import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Avatar,
    Stack,
    Grid,
    Card,
} from "@mui/material";

const FileUploadInput = ({
    type,
    allowedExtension,
    getValue,
    errorMsg,
    title,
}) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const allowedExtensions = allowedExtension;

    useEffect(() => {
        setError(errorMsg);
    }, [errorMsg]);

    const handleFileChange = async (event, type) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
        if (type === "image") {
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Only image files (JPG, PNG, GIF, WEBP) are allowed.");
                setFile(null);
                setPreview(null);
                return;
            }
            setError("");
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
        if (type === "pdf") {
            console.log(type);
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Only PDF files are allowed.");
                setFile(null);
                setPreview(null);
                return;
            }

            setError("");
            setFile(selectedFile);
            setPreview(selectedFile.name);
        }
        convertFileToBase64(selectedFile).then((base64) => {
            // uploadToBackend(base64);
            getValue(base64);
        });
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <>
            <Grid item xs={12}>
                <Card
                    sx={{
                        p: 2,
                        textAlign: "center",
                        boxShadow: 3,
                        marginTop: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Upload {title}
                    </Typography>
                    <input
                        type="file"
                        id={`${type}-input`}
                        style={{ display: "none" }}
                        accept={
                            type === "image" ? "image/*" : "application/pdf"
                        }
                        onChange={(e) => handleFileChange(e, type)}
                    />
                    <label htmlFor={`${type}-input`}>
                        <Button
                            variant="contained"
                            component="span"
                            sx={{ mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Choose File"}
                        </Button>
                    </label>
                    {file && (
                        <Stack alignItems="center">
                            <Avatar
                                src={preview}
                                alt="Preview"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: "12px",
                                    boxShadow: 3,
                                }}
                            />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={1}
                            >
                                {file.name}
                            </Typography>
                        </Stack>
                    )}

                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </Card>
            </Grid>
        </>
    );
};

export default FileUploadInput;
