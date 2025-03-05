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
    // Clear the timeout on component unmount
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
    // Clear the previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to wait for the user to finish typing
    const newTypingTimeout = setTimeout(() => {
      // Do something with the final input value
      getValue(value);
    }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)

    // Update the timeout state
    setTypingTimeout(newTypingTimeout);

    // Update the input value
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
        : <label className="input-label">{label}</label>
      }
      <TextField
        id={`text-input${label}`}
        variant="outlined"
        size={size ?? "small"}
        placeholder={placeholder}
        type={type}
        inputRef={fileInputRef}
        value={inputValue}
        onBlur={onBlur}
        onChange={handleInputChange}
        error={error}
        helperText={errorMsg}
        fullWidth
        multiline={multiline ?? false}
        rows={rows}
        disabled={disabled ?? false}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}

export default TextInput;
