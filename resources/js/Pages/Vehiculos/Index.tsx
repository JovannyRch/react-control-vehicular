import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect, useMemo } from "react";
import { Vehiculo } from "@/types/Vehiculo";
import Button from "@/Components/Button";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { AiFillEye, AiOutlineDownload } from "react-icons/ai";
import { BiPlus, BiSearch, BiSolidCarMechanic } from "react-icons/bi";
import { FaEdit, FaTools } from "react-icons/fa";
import MainColorContainer from "@/Components/MainColorContainer";
import { Typography } from "@/Components/Typography";
import RoundedIconButton from "@/Components/RoundedIconButton";
import useDebounce from "@/hooks/useDebounce";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import BreadcrumbItem from "@/Components/BreadcrumbItem";

interface VehiculosProps extends PageProps {
    vehiculos: Vehiculo[];
    plantilla: string;
    estado: string;
    search: string;
    loadFuel: boolean;
    tools: boolean;
    maintenance: boolean;
}

export default function Vehiculos({
    auth,
    vehiculos: vehicles,
    plantilla,
    estado,
    search,
    loadFuel,
    maintenance,
    tools,
}: VehiculosProps) {
    const form = useForm({
        search,
    });

    const { user } = auth;

    const { props } = usePage();
    const { message } = props;

    useEffect(() => {
        if (search) {
            document.getElementById("default-search")?.focus();
        }
    }, [search]);

    const debouncedSearch = useDebounce(form.data.search, 500);

    useUpdateEffect(() => {
        handleSearch(debouncedSearch);
    }, [debouncedSearch]);

    const handleSearch = (value: string) => {
        router.visit(
            route("vehiculos.index", {
                search: value,
                plantilla,
                ...(Boolean(estado) && { estado }),
                ...(loadFuel && { loadFuel: "true" }),
                ...(maintenance && { maintenance: "true" }),
                ...(tools && { tools: "true" }),
            })
        );
    };

    const tableHeaders = useMemo(() => {
        return [
            {
                label: "CIV",
                key: "civ",
            },
            {
                label: "Número económico",
                key: "name",
            },
            {
                label: "Placa",
                key: "placa",
            },
            {
                label: "# Serie",
                key: "serie",
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
                label: "Acciones",
                key: "action",
            },
        ].filter((header) => Boolean(header));
    }, []);

    const canLoadFuel = (vehiculo: Vehiculo) => {
        if (!loadFuel) {
            return false;
        }
        return (
            vehiculo.plantilla !== "propia" ||
            (vehiculo.plantilla === "propia" && vehiculo.estado === "vigente")
        );
    };

    const canEdit = useMemo(() => {
        if (user.role === "PLANTILLA") {
            return false;
        }

        return !(loadFuel || maintenance || tools);
    }, [loadFuel, maintenance, tools]);

    const canAdd = useMemo(() => {
        if (user.role === "PLANTILLA") {
            return false;
        }

        return !loadFuel && !maintenance && !tools;
    }, [loadFuel, maintenance, tools]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <BreadcrumbItem displayArrow={false}>
                            <>Vehículos</>
                        </BreadcrumbItem>
                        {plantilla && (
                            <BreadcrumbItem>
                                <div className="capitalize">{plantilla}</div>
                            </BreadcrumbItem>
                        )}
                        {plantilla === "propia" && (
                            <BreadcrumbItem>
                                <div className="capitalize">{estado}</div>
                            </BreadcrumbItem>
                        )}
                        {loadFuel && (
                            <BreadcrumbItem>
                                <>Cargas de combustible</>
                            </BreadcrumbItem>
                        )}
                        {maintenance && (
                            <BreadcrumbItem>
                                <>Mantenimiento</>
                            </BreadcrumbItem>
                        )}
                        {tools && (
                            <BreadcrumbItem>
                                <>Accesorios</>
                            </BreadcrumbItem>
                        )}
                    </ol>
                </nav>
            }
        >
            <Head title="Vehículos" />
            {(message as String) && (
                <div
                    className="relative px-4 py-3 text-center text-green-700 bg-green-100 border border-green-400 rounded"
                    role="alert"
                >
                    <span className="block text-center sm:inline w-100">
                        {message as String}
                    </span>
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <MainColorContainer className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4">
                            <div className="mb-3">
                                <Typography.Title className="text-2xl font-semibold ">
                                    Lista de vehículos
                                    {maintenance && " | Mantenimiento"}
                                </Typography.Title>

                                {plantilla && (
                                    <Typography.Subtitle className="mt-3 ">
                                        <span className="font-semibold">
                                            Plantilla:
                                        </span>{" "}
                                        {plantilla}
                                    </Typography.Subtitle>
                                )}
                                {plantilla === "propia" && (
                                    <Typography.Subtitle className="mt-3 ">
                                        <span className="font-semibold">
                                            Estado:
                                        </span>{" "}
                                        {estado}
                                    </Typography.Subtitle>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-4">
                                    {canAdd && (
                                        <div className="flex items-center justify-end gap-4 mt-4">
                                            <Button
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "vehiculos.create",
                                                            {
                                                                plantilla,
                                                            }
                                                        )
                                                    )
                                                }
                                                style="main"
                                            >
                                                Agregar vehículo
                                                <BiPlus />
                                            </Button>

                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    window.open(
                                                        route("vehiculos.pdf", {
                                                            plantilla,
                                                            estado,
                                                            ...(Boolean(
                                                                search
                                                            ) && {
                                                                search,
                                                            }),
                                                        }),
                                                        "_blank"
                                                    )
                                                }
                                                style="main"
                                            >
                                                Generar PDF
                                                <AiOutlineDownload />
                                            </Button>
                                        </div>
                                    )}
                                    <div className="w-1/2">
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
                                                className="block w-full p-4 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg ps-10 focus:ring-blue-500 focus:border-blue-500 "
                                                placeholder="Buscar vehículo..."
                                                onChange={(e) =>
                                                    form.setData(
                                                        "search",
                                                        e.target.value
                                                    )
                                                }
                                                value={form.data.search}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                                    <thead className="text-xs text-gray-700 uppercase bg-[#141E30] ">
                                        <tr>
                                            {tableHeaders.map(
                                                (header, index) => (
                                                    <th
                                                        key={index}
                                                        className="px-6 py-4 font-semibold text-gray-400"
                                                    >
                                                        {header.label}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map((vehiculo, index) => {
                                            if (
                                                loadFuel &&
                                                !canLoadFuel(vehiculo)
                                            ) {
                                                return null;
                                            }
                                            return (
                                                <tr
                                                    key={index}
                                                    className="border-b border-gray-200 hover:bg-[#475569] text-gray-200"
                                                >
                                                    <td className="px-6 py-4 font-bold text-white text-md">
                                                        {vehiculo.civ ?? "-"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            vehiculo.numero_economico
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {vehiculo.placa}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {vehiculo.no_serie}
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
                                                        <div className="flex items-center space-x-2">
                                                            {!tools && (
                                                                <RoundedIconButton
                                                                    tooltip={
                                                                        loadFuel
                                                                            ? "Accesorios"
                                                                            : maintenance
                                                                            ? "Mantenimientos"
                                                                            : "Ver detalle"
                                                                    }
                                                                    name="view"
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            route(
                                                                                "vehiculos.show",
                                                                                {
                                                                                    vehiculo:
                                                                                        vehiculo.id,
                                                                                    ...(loadFuel
                                                                                        ? {
                                                                                              loadFuel:
                                                                                                  "true",
                                                                                          }
                                                                                        : maintenance && {
                                                                                              maintenance:
                                                                                                  "true",
                                                                                          }),
                                                                                }
                                                                            )
                                                                        )
                                                                    }
                                                                    className="flex items-center gap-2"
                                                                    type="green"
                                                                >
                                                                    {canLoadFuel(
                                                                        vehiculo
                                                                    ) ? (
                                                                        <BsFillFuelPumpDieselFill />
                                                                    ) : maintenance ? (
                                                                        <BiSolidCarMechanic />
                                                                    ) : (
                                                                        <AiFillEye />
                                                                    )}
                                                                </RoundedIconButton>
                                                            )}
                                                            {tools && (
                                                                <RoundedIconButton
                                                                    type="green"
                                                                    tooltip="Herramientas"
                                                                    name="tools"
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            route(
                                                                                "vehiculos.show",
                                                                                {
                                                                                    vehiculo:
                                                                                        vehiculo.id,
                                                                                    tools: "true",
                                                                                }
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    <FaTools />
                                                                </RoundedIconButton>
                                                            )}
                                                            {canEdit && (
                                                                <>
                                                                    <RoundedIconButton
                                                                        tooltip="Editar"
                                                                        name="edit"
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
                                                                        type="yellow"
                                                                        className="flex items-center gap-2 "
                                                                    >
                                                                        <FaEdit />
                                                                    </RoundedIconButton>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </MainColorContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
