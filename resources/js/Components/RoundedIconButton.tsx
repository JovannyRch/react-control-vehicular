import React from "react";

const RoundedIconButton = ({
    children,
    className,
    type = "main",
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    type?: "main" | "green" | "yellow" | "red";
    onClick?: () => void;
}) => {
    return (
        <button
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
};

export default RoundedIconButton;
