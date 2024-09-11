import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useMemo } from "react";
import { router } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

interface Vehiculo {
    numero_economico: string;
    marca: string;
    tipo: string;
    modelo: string;
    placa: string;
    plantilla: string;
    estado: string;
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
        ].filter((header) => Boolean(header));
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Vehículos {plantilla}
                </h2>
            }
        >
            <Head title="Vehículos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4">
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
