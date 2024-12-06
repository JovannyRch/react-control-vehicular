import React from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

const Title = ({ children, className }: Props) => {
    return (
        <h1 className={`text-2xl font-semibold text-white ${className}`}>
            {children}
        </h1>
    );
};

const Subtitle = ({ children, className }: Props) => {
    return (
        <h2 className={`text-lg font-semibold text-gray-400 ${className}`}>
            {children}
        </h2>
    );
};

const Paragraph = ({ children, className }: Props) => {
    return <p className={`text-base text-gray-300 ${className}`}>{children}</p>;
};

const Label = ({ children, className }: Props) => {
    return (
        <label className={`block mb-2 text-gray-400 ${className}`}>
            {children}
        </label>
    );
};

export const Typography = {
    Title,
    Subtitle,
    Paragraph,
    Label,
};
