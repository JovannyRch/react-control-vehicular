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
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

interface VehiculosProps extends PageProps {
    pagination: any;
}

export default function VehiculosCargas({ auth, pagination }: VehiculosProps) {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (auth.user.role !== "ADMIN") {
            router.replace(route("vehiculos.index"));
        }
    }, []);

    const [csvFile, setCsvFile] = useState<File | null>(null);

    console.log("pagination.data", pagination.data);

    const form = useForm({
        id: "",
        fecha: "",
        importe: "",
        litros: "",
        vehiculo_id: "",
        odometro_inicial: "",
        odometro_final: "",
        folio: "",
        conductor: "",
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

                router.reload();
                setIsUploadModalOpen(false);
            })
            .catch((error) => {
                alert("Error al procesar el archivo");
            });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { data } = form;
        axios
            .post(`/cargas/edit/${data.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const { data } = response;

                StatusAlertService.showSuccess(data.message);
                router.reload();
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                StatusAlertService.showError(
                    "Error al intentar editar la carga"
                );
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
            label: "Vehículo (CIV)",
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
            <StatusAlert />

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
                                                                {
                                                                    carga
                                                                        .vehiculo
                                                                        .civ
                                                                }
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <div className="flex justify-center gap-2">
                                                                <RoundedIconButton
                                                                    className="bg-blue-600"
                                                                    onClick={() => {
                                                                        console.log(
                                                                            "carga",
                                                                            carga
                                                                        );
                                                                        form.setData(
                                                                            {
                                                                                id: String(
                                                                                    carga.id
                                                                                ),
                                                                                litros: String(
                                                                                    carga.litros ??
                                                                                        ""
                                                                                ),
                                                                                importe:
                                                                                    String(
                                                                                        carga.importe ??
                                                                                            ""
                                                                                    ),
                                                                                fecha: carga.fecha,
                                                                                odometro_inicial:
                                                                                    String(
                                                                                        carga.odometro_inicial ??
                                                                                            ""
                                                                                    ),
                                                                                odometro_final:
                                                                                    String(
                                                                                        carga.odometro_final ??
                                                                                            ""
                                                                                    ),
                                                                                folio:
                                                                                    carga.folio ??
                                                                                    "",
                                                                                conductor:
                                                                                    carga.conductor ??
                                                                                    "",
                                                                                vehiculo_id:
                                                                                    String(
                                                                                        carga.vehiculo_id
                                                                                    ),
                                                                            }
                                                                        );

                                                                        setIsEditModalOpen(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <BiEdit />
                                                                </RoundedIconButton>

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
            <Modal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            >
                <div className="p-4 bg-[#141E30]">
                    <Typography.Title className="mb-4">
                        Editar carga de combustible
                    </Typography.Title>

                    <form className="col-span-4" onSubmit={handleEditSubmit}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex-1">
                                <InputLabel htmlFor="litros" value="Litros" />
                                <TextInput
                                    id="litros"
                                    min={0}
                                    name="litros"
                                    value={form.data.litros}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("litros", e.target.value)
                                    }
                                />
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.litros}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex-1">
                                <InputLabel htmlFor="importe" value="Importe" />
                                <TextInput
                                    id="importe"
                                    name="importe"
                                    min={0}
                                    value={form.data.importe}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("importe", e.target.value)
                                    }
                                />
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.importe}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex-1">
                                <InputLabel htmlFor="fecha" value="Fecha" />
                                <TextInput
                                    id="importe"
                                    type="date"
                                    name="importe"
                                    value={form.data.fecha}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("fecha", e.target.value)
                                    }
                                />
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.fecha}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-2 mt-4">
                            <div className="flex-1">
                                <InputLabel
                                    htmlFor="odometro_inicial"
                                    value="Odometro inicial"
                                />
                                <TextInput
                                    id="odometro_inicial"
                                    type="text"
                                    name="odometro_inicial"
                                    value={form.data.odometro_inicial}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData(
                                            "odometro_inicial",
                                            e.target.value
                                        )
                                    }
                                />

                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.odometro_inicial?.replace(
                                        "The odometro field must be greater than",
                                        "El campo odometro debe ser mayor a"
                                    )}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex-1">
                                <InputLabel
                                    htmlFor="odometro_final"
                                    value="Odometro final"
                                />
                                <TextInput
                                    id="odometro_final"
                                    type="text"
                                    name="odometro_final"
                                    value={form.data.odometro_final}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData(
                                            "odometro_final",
                                            e.target.value
                                        )
                                    }
                                />

                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.odometro_inicial?.replace(
                                        "The odometro field must be greater than",
                                        "El campo odometro debe ser mayor a"
                                    )}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-4">
                            <div className="flex-1">
                                <InputLabel htmlFor="folio" value="Folio" />
                                <TextInput
                                    id="folio"
                                    type="text"
                                    name="folio"
                                    value={form.data.folio}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("folio", e.target.value)
                                    }
                                />
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.folio}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1">
                                <InputLabel
                                    htmlFor="conductor"
                                    value="Conductor"
                                />
                                <TextInput
                                    id="conductor"
                                    type="text"
                                    name="conductor"
                                    value={form.data.conductor}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData(
                                            "conductor",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.conductor}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="justify-end mt-5 display w-100 ">
                            <Button disabled={form.processing} type="submit">
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
