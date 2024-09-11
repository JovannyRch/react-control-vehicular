import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useMemo } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
interface Vehiculo {
    numero_economico: string;
    marca: string;
    tipo: string;
    modelo: string;
    placa: string;
    plantilla: string;
    estado: string;
    id: number;
}

interface VehiculosProps extends PageProps {
    vehiculos: Vehiculo[];
    plantilla: string;
    estado: string;
}

export default function Vehiculos({
    auth,
    vehiculos: vehicles,
    plantilla,
    estado,
}: VehiculosProps) {
    const tableHeaders = useMemo(() => {
        return [
            {
                label: "Número económico",
                key: "name",
            },
            {
                label: "Marca",
                key: "color",
            },
            {
                label: "Tipo",
                key: "category",
            },
            {
                label: "Modelo",
                key: "price",
            },
            {
                label: "Placa",
                key: "action",
            },
            plantilla === "propia" && {
                label: "Estado",
                key: "estado",
            },
            {
                label: "Plantilla",
                key: "template",
            },
            {
                label: "Acciones",
                key: "action",
            },
        ].filter((header) => Boolean(header));
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a
                                    href={route("vehiculos.index")}
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
                                >
                                    Vehículos
                                </a>
                            </li>
                            {plantilla && (
                                <li>
                                    <div className="flex items-center">
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
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-gray-700 ms-1 hover:text-blue-600 md:ms-2 "
                                        >
                                            {plantilla}
                                        </a>
                                    </div>
                                </li>
                            )}
                            {plantilla === "propia" && (
                                <li aria-current="page">
                                    <div className="flex items-center">
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
                                        <span className="text-sm font-medium text-gray-500 ms-1 md:ms-2 ">
                                            {estado}
                                        </span>
                                    </div>
                                </li>
                            )}
                        </ol>
                    </nav>
                </h2>
            }
        >
            <Head title="Vehículos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4">
                            <div className="flex justify-end gap-4">
                                <PrimaryButton
                                    className="mb-4"
                                    onClick={() =>
                                        router.visit(
                                            route("vehiculos.create", {
                                                plantilla,
                                            })
                                        )
                                    }
                                >
                                    Agregar vehículo
                                </PrimaryButton>

                                <PrimaryButton
                                    className="mb-4"
                                    onClick={() => window.print()}
                                >
                                    Generar PDF
                                </PrimaryButton>
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                        <tr>
                                            {tableHeaders.map(
                                                (header, index) => (
                                                    <th
                                                        key={index}
                                                        className="px-6 py-4 font-semibold text-gray-900"
                                                    >
                                                        {header.label}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map((vehiculo, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-200 hover:bg-gray-100"
                                            >
                                                <td className="px-6 py-4">
                                                    {vehiculo.numero_economico}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {vehiculo.marca}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {vehiculo.tipo}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {vehiculo.modelo}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {vehiculo.placa}
                                                </td>
                                                {plantilla === "propia" && (
                                                    <td className="px-6 py-4">
                                                        {vehiculo.estado}
                                                    </td>
                                                )}
                                                <td className="px-6 py-4">
                                                    {vehiculo.plantilla}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <SecondaryButton
                                                            onClick={() =>
                                                                router.visit(
                                                                    route(
                                                                        "vehiculos.edit",
                                                                        {
                                                                            vehiculo:
                                                                                vehiculo.id,
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </SecondaryButton>
                                                        {/*   <PrimaryButton
                                                            onClick={() =>
                                                                router.visit(
                                                                    route(
                                                                        "vehiculos.show",
                                                                        {
                                                                            vehiculo:
                                                                                vehiculo.numero_economico,
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Ver
                                                        </PrimaryButton> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
