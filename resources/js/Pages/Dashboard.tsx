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
import { Typography } from "@/Components/Typography";

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
                <Typography.Title className="text-xl font-semibold leading-tight ">
                    Inicio
                </Typography.Title>
            }
        >
            <Head title="Inicio" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[#141E30] shadow-sm sm:rounded-lg min-h-[80vh]">
                        <div className="flex justify-center ">
                            <div className="mt-2 mb-8 bg-gray-100">
                                <ApplicationLogo className="text-gray-500 fill-current " />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-8 w-100 ">
                            <div className="flex flex-col gap-4 justify-center w-[80%] p-4 border border-gray-400 rounded-md bg-slate-600">
                                <Typography.Title>Directorio</Typography.Title>
                                <div className="p-4 text-center border border-gray-400 rounded-md h-100 w-100 bg-[#141E30]">
                                    <Typography.Subtitle>
                                        Secretario de Seguridad y Protección
                                        Ciudadana
                                    </Typography.Subtitle>
                                    <Typography.Title className="text-2xl font-bold text-gray-600">
                                        Capitán Iván García Álvarez
                                    </Typography.Title>
                                    <Typography.Subtitle>
                                        Capitán de Navio, Infanteria de Marina,
                                        Fuerza Especial, Diplomado de Estado
                                        Mayor
                                    </Typography.Subtitle>
                                </div>
                                <div className="p-4 text-center border border-gray-400 rounded-md h-100 w-100 bg-[#141E30]">
                                    <Typography.Subtitle>
                                        Comisario General
                                    </Typography.Subtitle>
                                    <Typography.Title>
                                        Placido Jarquín
                                    </Typography.Title>
                                    <Typography.Subtitle>
                                        Comisionado de la Policia Estatal
                                    </Typography.Subtitle>
                                </div>
                                <div className="p-4 text-center border border-gray-400 rounded-md h-100 w-100 bg-[#141E30]">
                                    <Typography.Subtitle>
                                        Coordinadora de Desarrollo de Personal
                                    </Typography.Subtitle>
                                    <Typography.Title>
                                        L.A. Claudia Monserrat Caravantes
                                        Antonio
                                    </Typography.Title>
                                </div>
                            </div>
                            <div className="flex justify-center w-3/4 gap-10 mb-3">
                                <Typography.Label>
                                    Policia Estatal
                                </Typography.Label>
                                <div>
                                    <Typography.Paragraph>
                                        Carretera Oaxaca-Pto. Ángel KM 9.5 Sta.
                                        Ma. Coyotepec, Oaxaca C.P. 71254
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        Tel.(951) 5015045 Ext 32024
                                    </Typography.Paragraph>
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
