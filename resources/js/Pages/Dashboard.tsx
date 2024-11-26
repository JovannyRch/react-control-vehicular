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
import ApplicationLogo from "@/Components/ApplicationLogo";

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
                        <div className="flex justify-center w-100">
                            <ApplicationLogo className="py-8 pb-8 text-gray-500 fill-current w-100" />
                        </div>

                        <div className="flex flex-col items-center justify-center gap-8 w-100">
                            <div className="flex flex-col gap-4 justify-center w-[80%] p-4 border border-gray-400 rounded-md ">
                                <div className="text-xl w-100">Directorio</div>
                                <div className="p-4 text-center border border-gray-400 rounded-md h-100 w-100">
                                    <h2 className="text-xl">
                                        Secretario de Seguridad y Protección
                                        Ciudadana
                                    </h2>
                                    <h2 className="text-2xl font-bold text-gray-600">
                                        Capitán Iván García Álvarez
                                    </h2>
                                    <h4>
                                        Capitán de Navio, Infanteria de Marina,
                                        Fuerza Especial, Diplomado de Estado
                                        Mayor
                                    </h4>
                                </div>
                                <div className="p-4 text-center border border-gray-400 rounded-md h-100 w-100">
                                    <h2 className="text-xl">
                                        Comisario General
                                    </h2>
                                    <h2 className="text-2xl font-bold text-gray-600">
                                        Placido Jarquín
                                    </h2>
                                    <h4>Comisionado de la Policia Estatal</h4>
                                </div>
                                <div className="p-4 text-center border border-gray-400 rounded-md h-100 w-100">
                                    <h2 className="text-xl">
                                        Coordinadora de Desarrollo de Personal
                                    </h2>
                                    <h2 className="text-2xl font-bold text-gray-600">
                                        L.A. Claudia Monserrat Caravantes
                                        Antonio
                                    </h2>
                                </div>
                            </div>
                            <div className="flex justify-center w-3/4 gap-10">
                                <b>Policia Estatal</b>
                                <div>
                                    <p>
                                        Carretera Oaxaca-Pto. Ángel KM 9.5 Sta.
                                        Ma. Coyotepec, Oaxaca C.P. 71254
                                    </p>
                                    <p>Tel.(951) 5015045 Ext 32024</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="grid grid-cols-6 p-8 text-gray-900">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
