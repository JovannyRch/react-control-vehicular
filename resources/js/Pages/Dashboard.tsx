import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BiSolidCarMechanic } from "react-icons/bi";
import Button from "@/Components/Button";
import { Dropdown as NestedDropdown } from "react-nested-dropdown";
import "react-nested-dropdown/dist/styles.css";
import { BsChevronRight } from "react-icons/bs";
import { FaTools } from "react-icons/fa";

const CardButton = ({ title, onClick, icon }: any) => (
    <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-700 hover:bg-gray-50"
    >
        <div className="flex flex-col items-center w-full gap-4 text-black">
            {title}
            {icon}
        </div>
    </button>
);

export default function Dashboard({ auth }: PageProps) {
    const cargaItems = [
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
        {
            label: "Listar todas",
            onSelect: () => router.visit("/vehiculos?loadFuel=true"),
        },
    ];

    const mantenimientoItems = [
        {
            label: "Propia",
            items: [
                {
                    label: "Vigente",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=vigente&maintenance=true"
                        ),
                },
            ],
        },
        {
            label: "2024",
            onSelect: () =>
                router.visit("/vehiculos?plantilla=2024&maintenance=true"),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inicio
                </h2>
            }
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg min-h-[80vh]">
                        <div className="grid grid-cols-6 p-8 text-gray-900">
                            <NestedDropdown
                                items={cargaItems}
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
                                    <CardButton
                                        style="green"
                                        className="flex items-center gap-2 text-black"
                                        onClick={onClick}
                                        title="Carga de combustible"
                                        icon={
                                            <BsFillFuelPumpDieselFill className="w-10 h-10" />
                                        }
                                    />
                                )}
                            </NestedDropdown>

                            <NestedDropdown
                                items={mantenimientoItems}
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
                                    <CardButton
                                        onClick={onClick}
                                        title="Mantenimiento"
                                        icon={
                                            <BiSolidCarMechanic className="w-10 h-10" />
                                        }
                                    />
                                )}
                            </NestedDropdown>
                            <CardButton
                                style="green"
                                className="flex items-center gap-2 text-black"
                                onClick={() => {
                                    router.visit("/vehiculos?tools=true");
                                }}
                                title="Accesorios/Refacciones"
                                icon={<FaTools className="w-10 h-10" />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
