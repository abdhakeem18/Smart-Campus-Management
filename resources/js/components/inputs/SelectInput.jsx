import { useState, useEffect, useRef } from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    OutlinedInput,
    FormHelperText,
} from "@mui/material";

function SelectInput({ error, errorMsg, value, label, getValue, size, data }) {
    const [inputValue, setInputValue] = useState(value || "");

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function menuList() {
        if (data) {
            return data.map((list) => (
                <MenuItem key={list["id"]} value={list["id"]}>
                    {list["course_name"] ? list["course_name"] : list["name"]}
                </MenuItem>
            ));
        }
    }

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (event) => {
        const newValue = event.target.value;

        if (getValue) getValue(newValue);

        setInputValue(newValue);
    };

    return (
        <>
            {/* <label className="fw-bold mb-1">{label}</label> */}
            <FormControl fullWidth size={size ?? "small"} error={error} className="mt-2">
                <InputLabel id={`${label}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${label}-label`}
                    id={`${label}-select`}
                    value={inputValue}
                    onChange={handleInputChange}
                    input={<OutlinedInput label={label} />}
                    MenuProps={MenuProps}
                >
                    {menuList()}
                </Select>
                <FormHelperText>{errorMsg}</FormHelperText>
            </FormControl>
        </>
    );
}

export default SelectInput;
