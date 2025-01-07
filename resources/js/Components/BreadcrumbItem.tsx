const BreadcrumbItem = ({
    children,
    displayArrow = true,
}: {
    children: React.ReactNode;
    displayArrow?: boolean;
}) => {
    return (
        <li aria-current="page">
            <div className="flex items-center">
                {displayArrow && (
                    <svg
                        className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                )}

                <div className="text-sm font-medium text-gray-200 ms-1 md:ms-2 ">
                    <>{children}</>
                </div>
            </div>
        </li>
    );
};

export default BreadcrumbItem;
