import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";

function TextInput({
  error,
  errorMsg,
  value,
  label,
  placeholder,
  type,
  onBlur,
  getValue,
  variant,
  size,
  classes,
  disabled,
  multiline,
  rows,
  contactUs,
  required = false
}) {
  const [inputValue, setInputValue] = useState(value);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = async (event) => {

    if (type === "file") {
      const file = event.target.files[0];
      const File = await convertFileToBase64(file);
      // console.log('"calue" => ', File);
      const uniqueId = `${Date.now()}`;
      const fileData = { id: uniqueId, filename: file.name, content: File + `|<>|${uniqueId}`, encoding: "base64"};

      fileInputRef.current.value = '';
      getValue(fileData);
      return;
    }
    const value = event.target.value;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      getValue(value);
    }, 1000);

    setTypingTimeout(newTypingTimeout);

    setInputValue(value);
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
      {contactUs ?
        type != "file" && <label className="fw-bold mb-1">{label}{required && "*:"}</label>
        : ""
      }
      <TextField
        id={`text-input${label}`}
        label={label}
        variant="outlined"
        size={size ?? "small"}
        placeholder={placeholder}
        type={type}
        inputRef={fileInputRef}
        value={inputValue}
        onBlur={onBlur}
        className={classes}
        onChange={handleInputChange}
        error={error}
        helperText={errorMsg}
        fullWidth
        multiline={multiline ?? false}
        rows={rows}
        disabled={disabled ?? false}
      />
    </>
  );
}

export default TextInput;
