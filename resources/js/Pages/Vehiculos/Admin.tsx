import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { Vehiculo } from "@/types/Vehiculo";
import Button from "@/Components/Button";
import MainColorContainer from "@/Components/MainColorContainer";
import { Typography } from "@/Components/Typography";
import { AiOutlineUpload } from "react-icons/ai";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import { Estados, Plantillas } from "@/types/const";
import axios from "axios";
import { BiEdit, BiSearch, BiShow, BiTrash } from "react-icons/bi";
import Pagination from "@/Components/Pagination";
import RoundedIconButton from "@/Components/RoundedIconButton";
import { BsFuelPump } from "react-icons/bs";
import { addElipsis } from "@/utils";

interface VehiculosProps extends PageProps {
    pagination: any;
    plantilla: string;
    estado: string;
    search: string;
    loadFuel: boolean;
    tools: boolean;
    maintenance: boolean;
}

export default function Vehiculos({ auth, pagination }: VehiculosProps) {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    useEffect(() => {
        if (auth.user.role !== "ADMIN") {
            router.replace(route("vehiculos.index"));
        }

        form.setData("search", document.location.search.split("=")[1]);
    }, []);

    const [csvFile, setCsvFile] = useState<File | null>(null);

    const { data, setData } = useForm({
        plantilla: "2019",
        estado: "vigente",
    });

    const form = useForm({
        search: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!csvFile) return;
        const formData = new FormData();
        formData.append("csv_file", csvFile);
        formData.append("plantilla", data.plantilla);
        formData.append("estado", data.estado);

        axios
            .post("/upload-vehicles", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                router.reload();
                setIsUploadModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
            });
    };

    const handleDestroyAll = () => {
        axios.delete("/vehicles/destroy-all").then((response) => {
            router.reload();
        }, console.error);
    };

    const tableHeaders = [
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
            label: "Plantilla/Estado",
            key: "plantilla",
        },
        {
            label: "Acciones",
            key: "action",
        },
    ];

    const handleSearch: FormEventHandler = (e) => {
        e.preventDefault();

        router.visit(
            route("admin.vehiculos", {
                search: form.data.search,
            })
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a
                                    href={route("vehiculos.index")}
                                    className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-blue-600 "
                                >
                                    Vehículos
                                </a>
                            </li>
                        </ol>
                    </nav>
                </h2>
            }
        >
            <Head title="Vehículos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <MainColorContainer className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4">
                            <Typography.Title className="text-2xl font-semibold ">
                                Lista de vehículos ({pagination.total}{" "}
                                registros)
                            </Typography.Title>

                            <div className="flex items-center justify-between my-8">
                                <div className="flex items-center flex-1 gap-2">
                                    <form
                                        className="flex-1 max-w-md "
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
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="submit"
                                                    style="main"
                                                    className="absolute end-2.5 bottom-0"
                                                >
                                                    Buscar
                                                    <BiSearch />
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="flex items-center h-full ">
                                        {form.data.search && (
                                            <Button
                                                onClick={() =>
                                                    router.visit(
                                                        route("admin.vehiculos")
                                                    )
                                                }
                                            >
                                                Limpiar busqueda
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() =>
                                            confirm(
                                                "¿Estás seguro de eliminar todos los registros?"
                                            ) && handleDestroyAll()
                                        }
                                    >
                                        Eliminar todos los registros
                                        <BiTrash />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setIsUploadModalOpen(true)
                                        }
                                    >
                                        Cargar desde CSV
                                        <AiOutlineUpload />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative pb-12 mt-8 overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                                    <thead className="text-xs text-gray-700 uppercase bg-[#141E30] ">
                                        <tr>
                                            {tableHeaders.map(
                                                (header, index) => (
                                                    <th
                                                        key={index}
                                                        className="font-semibold text-center text-gray-400"
                                                    >
                                                        {header.label}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagination.data.map(
                                            (
                                                vehiculo: Vehiculo,
                                                index: number
                                            ) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className="border-b border-gray-200 hover:bg-[#475569] text-gray-200"
                                                    >
                                                        <td className="font-bold text-center text-white text-md">
                                                            {vehiculo.civ ??
                                                                "-"}
                                                        </td>
                                                        <td className="text-center">
                                                            {
                                                                vehiculo.numero_economico
                                                            }
                                                        </td>
                                                        <td className="text-center">
                                                            {vehiculo.placa}
                                                        </td>
                                                        <td className="text-center">
                                                            {vehiculo.no_serie}
                                                        </td>
                                                        <td className="text-center">
                                                            {vehiculo.marca}
                                                        </td>
                                                        <td className="text-center">
                                                            {addElipsis(
                                                                vehiculo.tipo,
                                                                15
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {vehiculo.modelo}
                                                        </td>
                                                        <td className="text-center">
                                                            {[
                                                                vehiculo.plantilla,
                                                                vehiculo.plantilla ===
                                                                "propia"
                                                                    ? vehiculo.estado
                                                                    : null,
                                                            ]
                                                                .filter(Boolean)
                                                                .join("/")}
                                                        </td>
                                                        <td>
                                                            <div className="flex justify-center gap-2">
                                                                <RoundedIconButton
                                                                    className="bg-yellow-600"
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
                                                                >
                                                                    <BiEdit />
                                                                </RoundedIconButton>
                                                                <RoundedIconButton
                                                                    className="bg-green-600"
                                                                    tooltip="Detalles"
                                                                    name="details"
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
                                                                    <BiShow />
                                                                </RoundedIconButton>
                                                                <RoundedIconButton
                                                                    className="bg-red-600"
                                                                    name="delete"
                                                                    tooltip="Eliminar"
                                                                    onClick={() => {
                                                                        if (
                                                                            confirm(
                                                                                "¿Estás seguro de eliminar este registro?"
                                                                            )
                                                                        ) {
                                                                            axios
                                                                                .delete(
                                                                                    `/vehicles/${vehiculo.id}`
                                                                                )
                                                                                .then(
                                                                                    (
                                                                                        response
                                                                                    ) => {
                                                                                        router.reload();
                                                                                    },
                                                                                    console.error
                                                                                );
                                                                        }
                                                                    }}
                                                                >
                                                                    <BiTrash />
                                                                </RoundedIconButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                                <Pagination pagination={pagination} />
                            </div>
                        </div>
                    </MainColorContainer>
                </div>
            </div>
            <Modal
                show={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            >
                <div className="p-4 pb-8 bg-[#141E30]">
                    <Typography.Title className="mb-4">
                        Cargar vehículos desde CSV
                    </Typography.Title>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-4 md:grid-cols-2 sm:grid-cols-1"
                    >
                        <div>
                            <InputLabel htmlFor="plantilla" value="Plantilla" />
                            <select
                                className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) =>
                                    setData("plantilla", e.target.value)
                                }
                            >
                                {Plantillas.map((plantilla, index) => (
                                    <option
                                        key={index}
                                        value={plantilla.value}
                                        selected={
                                            plantilla.value === data.plantilla
                                        }
                                    >
                                        {plantilla.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {data.plantilla === "propia" && (
                            <div>
                                <InputLabel htmlFor="estado" value="Estado" />
                                <select
                                    className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={(e) =>
                                        setData("estado", e.target.value)
                                    }
                                >
                                    {Estados.map((estado, index) => (
                                        <option
                                            key={index}
                                            value={estado.value}
                                            selected={
                                                estado.value === data.estado
                                            }
                                        >
                                            {estado.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="col-span-2 text-white">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => {
                                    setCsvFile(e.target.files?.[0] || null);
                                }}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="flex justify-center mt-4">
                                <Button type="submit" disabled={!csvFile}>
                                    Procesar Archivo
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
