import React from "react";

const PrimaryButton = ({
    type = "button",
    onClick,
    children,
    disabled = false,
    customClass,
    ...rest
}) => {
    return (
        <button
            className={`flex gap-2 items-center justify-center px-3 py-2 font-medium text-sm 
                         text-white rounded border border-blue-600/80 bg-blue-600/60 hover:bg-blue-600/50
                         xs:py-[5px] xs:text-[11px] sm:text-xs
                         ${disabled ? 'opacity-45 hover:bg-blue-800/60' : ''} ${customClass}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;