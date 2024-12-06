import React from "react";

const MainColorContainer = ({ children, className, ...rest }: any) => {
    return (
        <div className={`bg-[#141E30]  ${className}`} {...rest}>
            {children}
        </div>
    );
};

export default MainColorContainer;
