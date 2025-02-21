import React from "react";
import { Tooltip } from "react-tooltip";

const RoundedIconButton = ({
    children,
    className,
    type = "main",
    tooltip,
    name,
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    type?: "main" | "green" | "yellow" | "red";
    onClick?: () => void;
    tooltip?: string;
    name?: string;
}) => {
    const button = (
        <button
            data-tooltip-id={name}
            data-tooltip-content={tooltip}
            data-tooltip-target={name}
            className={`flex items-center justify-center w-10 h-10 rounded-full
        ${
            type === "main"
                ? "bg-[#9C2349]"
                : type === "green"
                ? "bg-[#2D8B5A]"
                : type === "yellow"
                ? "bg-[#FFC107]"
                : type === "red"
                ? "bg-[#E3342F]"
                : "bg-[#9C2349]"
        }
         text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
    if (tooltip) {
        return (
            <div>
                {button}

                <Tooltip id={name} />
            </div>
        );
    }

    return button;
};

export default RoundedIconButton;
