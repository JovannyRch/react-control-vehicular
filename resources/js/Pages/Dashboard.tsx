import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import Button from "@/Components/Button";
import { Dropdown as NestedDropdown } from "react-nested-dropdown";
import "react-nested-dropdown/dist/styles.css";
import { BsChevronRight } from "react-icons/bs";

export default function Dashboard({ auth }: PageProps) {
    const items = [
        {
            label: "2019",
            onSelect: () => {
                router.visit("/vehiculos?plantilla=2019&loadFuel=true");
            },
        },
        {
            label: "2023",
            onSelect: () => {
                router.visit("/vehiculos?plantilla=2023&loadFuel=true");
            },
        },
        {
            label: "Propia",
            items: [
                {
                    label: "Vigente",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=vigente&loadFuel=true"
                        ),
                },
            ],
        },
        {
            label: "2024",
            onSelect: () =>
                router.visit("/vehiculos?plantilla=2024&loadFuel=true"),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg min-h-[80vh]">
                        <div className="p-6 text-gray-900">
                            <NestedDropdown
                                items={items}
                                containerWidth={"auto"}
                                renderOption={(option) => (
                                    <button
                                        type="button"
                                        onClick={option.onSelect}
                                        className="flex items-center justify-between w-full px-1 pt-1 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out focus:outline-none focus:border-indigo-700"
                                    >
                                        <div className="flex-1 block w-full text-sm leading-5 text-gray-700 transition duration-150 ease-in-out text-start focus:outline-none focus:bg-gray-100 ">
                                            {option.label}
                                        </div>
                                        {option.items && (
                                            <div>
                                                <BsChevronRight />
                                            </div>
                                        )}
                                    </button>
                                )}
                            >
                                {({ onClick }) => (
                                    <Button
                                        style="green"
                                        className="flex items-center gap-2 text-black"
                                        onClick={onClick}
                                    >
                                        Carga de combustible
                                        <BsFillFuelPumpDieselFill className="inline-block mr-2" />
                                    </Button>
                                )}
                            </NestedDropdown>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
