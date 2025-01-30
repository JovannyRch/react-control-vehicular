import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { Vehiculo } from "@/types/Vehiculo";
import Button from "@/Components/Button";
import MainColorContainer from "@/Components/MainColorContainer";
import { Typography } from "@/Components/Typography";
import { AiOutlineUpload } from "react-icons/ai";
import Modal from "@/Components/Modal";
import axios from "axios";
import { BiEdit, BiSearch, BiShow, BiTrash } from "react-icons/bi";
import Pagination from "@/Components/Pagination";
import RoundedIconButton from "@/Components/RoundedIconButton";
import { CargaCombustible } from "@/types/CargaCombustible";
import { getKm, getRendimiento } from "@/utils/index";
import { formatCurrency, formatNumber } from "@/utils";

interface VehiculosProps extends PageProps {
    pagination: any;
}

export default function VehiculosCargas({ auth, pagination }: VehiculosProps) {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    useEffect(() => {
        if (auth.user.role !== "ADMIN") {
            router.replace(route("vehiculos.index"));
        }

        form.setData("search", document.location.search.split("=")[1]);
    }, []);

    const [csvFile, setCsvFile] = useState<File | null>(null);

    const form = useForm({
        search: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!csvFile) return;
        const formData = new FormData();
        formData.append("csv_file", csvFile);

        axios
            .post("/upload-cargas", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const { data } = response;
                alert(data.message);
                router.reload();
                setIsUploadModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
                alert("Error al procesar el archivo");
            });
    };

    const handleDestroyAll = () => {
        axios.delete(`/cargas/destroy-all`).then((response) => {
            router.reload();
        }, console.error);
    };

    const tableHeaders = [
        {
            label: "Folio",
            key: "folio",
        },
        {
            label: "Fecha",
            key: "fecha",
        },
        {
            label: "Importe",
            key: "importe",
        },
        {
            label: "Litros",
            key: "litros",
        },
        {
            label: "Odom Ini",
            key: "odomini",
        },
        {
            label: "Odom Fin",
            key: "odomfin",
        },
        {
            label: "Kilómetros",
            key: "kms",
        },

        {
            label: "Rendimiento",
            key: "rendimiento",
        },
        {
            label: "Conductor",
            key: "conductor",
        },
        {
            label: "Vehículo",
            key: "vehiculo",
        },
    ];

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
                                Total de cargas {pagination.total}
                            </Typography.Title>

                            <div className="flex items-center justify-between my-8">
                                <div className="flex items-center flex-1 gap-2"></div>
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
                                                carga: CargaCombustible,
                                                index: number
                                            ) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className="border-b border-gray-200 hover:bg-[#475569] text-gray-200"
                                                    >
                                                        <td className="font-bold text-center text-white text-md">
                                                            {carga.folio ?? "-"}
                                                        </td>
                                                        <td className="text-center">
                                                            {carga.fecha}
                                                        </td>
                                                        <td className="text-center">
                                                            {formatCurrency(
                                                                carga.importe
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {formatNumber(
                                                                carga.litros
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {isNaN(
                                                                Number(
                                                                    carga.odometro_inicial
                                                                )
                                                            )
                                                                ? carga.odometro_inicial ??
                                                                  "-"
                                                                : formatNumber(
                                                                      carga.odometro_inicial
                                                                  )}
                                                        </td>
                                                        <td className="text-center">
                                                            {isNaN(
                                                                Number(
                                                                    carga.odometro_final
                                                                )
                                                            )
                                                                ? carga.odometro_final ??
                                                                  "-"
                                                                : formatNumber(
                                                                      carga.odometro_final
                                                                  )}
                                                        </td>
                                                        <td className="text-center">
                                                            {getKm(carga)}
                                                        </td>
                                                        <td className="text-center">
                                                            {getRendimiento(
                                                                carga
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {carga.conductor ??
                                                                "-"}
                                                        </td>
                                                        <td className="text-center">
                                                            <Link
                                                                href={`/vehiculos/${carga.vehiculo_id}?loadFuel=true`}
                                                            >
                                                                Ir al vehículo
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <div className="flex justify-center gap-2">
                                                                <RoundedIconButton
                                                                    className="bg-red-600"
                                                                    onClick={() => {
                                                                        if (
                                                                            confirm(
                                                                                "¿Estás seguro de eliminar este registro?"
                                                                            )
                                                                        ) {
                                                                            axios
                                                                                .delete(
                                                                                    `/cargas/${carga.id}`
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
                        Cargar cargas del vehículo desde CSV
                    </Typography.Title>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-4 md:grid-cols-2 sm:grid-cols-1"
                    >
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
