import { useMemo } from "react";

interface ButtonProps {
    style?:
        | "default"
        | "alternative"
        | "dark"
        | "light"
        | "green"
        | "red"
        | "yellow"
        | "purple";
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const Button = ({
    style = "default",
    children,
    type = "button",
    disabled = false,
    className = "",
    onClick,
    ...rest
}: ButtonProps) => {
    const classNameButton = useMemo(() => {
        switch (style) {
            case "alternative":
                return "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100";
            case "dark":
                return "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
            case "light":
                return "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800";
            case "green":
                return "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
            case "red":
                return "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
            case "yellow":
                return "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
            default:
                return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
        }
    }, [type]);

    return (
        <button
            onClick={onClick}
            type={type}
            className={`flex gap-1  items-center ${classNameButton}
                ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${className}`}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
