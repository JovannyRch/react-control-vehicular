import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useMemo } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Vehiculo } from "@/types/Vehiculo";

interface VehiculosProps extends PageProps {
    vehiculos: Vehiculo[];
    plantilla: string;
    estado: string;
    search: string;
}

export default function Vehiculos({
    auth,
    vehiculos: vehicles,
    plantilla,
    estado,
    search,
}: VehiculosProps) {
    const form = useForm({
        search,
    });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.visit(
            route("vehiculos.index", {
                search: form.data.search,
                plantilla,
                ...(Boolean(estado) && { estado }),
            })
        );
    };

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
                key: "placa",
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
                            <div className="text-2xl font-semibold text-gray-800">
                                Lista de vehículos
                            </div>

                            {plantilla && (
                                <div className="mt-3 text-sm text-gray-600">
                                    <span className="font-semibold">
                                        Plantilla:
                                    </span>{" "}
                                    {plantilla}
                                </div>
                            )}
                            {plantilla === "propia" && (
                                <div className="mt-3 text-sm text-gray-600">
                                    <span className="font-semibold">
                                        Estado:
                                    </span>{" "}
                                    {estado}
                                </div>
                            )}

                            <form
                                className="max-w-md mx-auto"
                                onSubmit={handleSearch}
                            >
                                <div className="relative">
                                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                        placeholder="Buscar vehículo..."
                                        onChange={(e) =>
                                            form.setData(
                                                "search",
                                                e.target.value
                                            )
                                        }
                                        value={form.data.search}
                                    />
                                    <button
                                        type="submit"
                                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </form>

                            <div className="flex justify-end gap-4 mb-4">
                                <button
                                    onClick={() =>
                                        router.visit(
                                            route("vehiculos.create", {
                                                plantilla,
                                            })
                                        )
                                    }
                                    type="button"
                                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                >
                                    Agregar vehículo
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        window.open(
                                            route("vehiculos.pdf", {
                                                plantilla,
                                                estado,
                                                ...(Boolean(search) && {
                                                    search,
                                                }),
                                            }),
                                            "_blank"
                                        )
                                    }
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Generar PDF
                                </button>
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

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <SecondaryButton
                                                            onClick={() =>
                                                                router.visit(
                                                                    route(
                                                                        "vehiculos.show",
                                                                        {
                                                                            vehiculo:
                                                                                vehiculo.id,
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Detalles
                                                        </SecondaryButton>
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
