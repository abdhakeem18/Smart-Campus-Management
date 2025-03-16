import { useState } from "react";

export default function TextareaInput(props) {
    const {
        id,
        label,
        name,
        value,
        placeholder,
        getValue,
        error,
        required = false,
        type = "text",
        inputClasses,
        isPhoneInput,
        classes,
    } = props;

    const [inputValue, setInputValue] = useState(value);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const onChange = (event) => {
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

    return (
        <>
            <div className={classes}>
                <h6 className="mb-1">{label}</h6>

                {isPhoneInput ? (
                    <label className="phoneNumber-code">+{isPhoneInput}</label>
                ) : null}

                <textarea
                    type={type}
                    className={`form-control input-field ${inputClasses}`}
                    value={inputValue}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                ></textarea>
                {error && <div className="error">{error}</div>}
            </div>
        </>
    );
}
