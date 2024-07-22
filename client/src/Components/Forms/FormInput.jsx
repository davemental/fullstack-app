import React, { useState } from "react";
import { MdError } from "react-icons/md";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, customClass, innerRef, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="relative w-full">
            {label && (
                <label className="capitalize py-1 inline-block font-medium text-neutral-500">
                    {label} {props.required && (
                        <span className="text-red-500">*</span>
                    )}
                </label>
            )}

            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
                ref={innerRef}
                className={`w-full text-lg font-medium rounded-md border-[1px] outline-1 
                            placeholder:text-sm placeholder:font-normal border-neutral-300/40 py-2.5 px-3
                            shadow-lg shadow-orange-800/10
                            focus:outline-orange-500/80 ${customClass}`}
            />

            <div className="error hidden text-red-500 absolute w-full -bottom-[16px] right-0">
                <div className="flex justify-end items-center gap-1">
                    <MdError />
                    <span className="text-right break-words text-xs">
                        {errorMessage}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FormInput;