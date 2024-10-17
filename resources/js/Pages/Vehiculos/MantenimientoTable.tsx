import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import ReportSelector from "@/Components/ReportSelector";
import TextInput from "@/Components/TextInput";
import { Mantenimiento, mantenimientoStatus } from "@/types/Mantenimiento";
import { Vehiculo } from "@/types/Vehiculo";
import {
    formatCurrency,
    formatDate,
    formatOnlyDateValue,
    generateDate,
    getMonthName,
} from "@/utils";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

interface MantenimientoTableProps {
    registros: Mantenimiento[];
    vehiculo: Vehiculo;
    month: string | null;
    year: string | null;
}

const MantenimientoTable = ({
    vehiculo,
    registros = [],
    month,
    year,
}: MantenimientoTableProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentItemId, setCurrentItemId] = useState("");

    const today = new Date().toISOString().split("T")[0];
    const form = useForm({
        vehiculo_id: vehiculo.id,
        fecha_elaboracion: today,
        folio: "",
        fecha_ingreso: today,
        fecha_salida: today,
        taller_asignacion: "",
        servicio_solicitado: "",
        servicio_realizado: "",
        importe: "",
        folio_fiscal: "",
        folio_afectacion: "",
        estado: "proceso",
    });

    const { data, setData, errors } = form;

    const tableHeaders = [
        "Fecha elaboración",
        "Folio",
        "Fecha ingreso",
        "Fecha salida",
        "Taller asignación",
        "Servicio solicitado",
        "Servicio realizado",
        "Importe",
        "Folio fiscal",
        "Folio afectación",
        "Estado",
        "Acciones",
    ];

    const handleEditItem = (item: Mantenimiento) => {
        setIsEditMode(true);
        setCurrentItemId(item.id);
        setData({
            folio: item.folio,
            fecha_elaboracion: generateDate(item.fecha_elaboracion),
            fecha_ingreso: generateDate(item.fecha_ingreso),
            fecha_salida: generateDate(item.fecha_salida),
            taller_asignacion: item.taller_asignacion,
            servicio_solicitado: item.servicio_solicitado,
            servicio_realizado: item.servicio_realizado,
            importe: item.importe,
            folio_fiscal: item.folio_fiscal,
            folio_afectacion: item.folio_afectacion,
            estado: item.estado,
            vehiculo_id: data.vehiculo_id,
        });

        setOpenModal(true);
    };

    const handleGetReport = ({
        month,
        year,
    }: {
        month: string;
        year: string;
    }) => {
        router.visit(
            `/vehiculos/${vehiculo.id}?maintenance=true&month=${month}&year=${year}`
        );
    };

    return (
        <div className="p-4 mt-6 bg-white shadow-sm sm:rounded-lg sm:mx-8">
            <label
                htmlFor="historial"
                className="block mb-3 text-xl font-medium text-gray-700"
            >
                <b>
                    Mantenimientos
                    {month && year && (
                        <span>
                            {" "}
                            - {getMonthName(Number(month))} / {year}
                        </span>
                    )}
                </b>
            </label>

            <div className="flex items-center justify-end gap-4">
                <div>
                    <ReportSelector fetchData={handleGetReport} />
                </div>
                <div>
                    <Button style="green" onClick={() => setOpenModal(true)}>
                        <FiPlus className="w-6 h-6" />
                        Agregar mantenimiento
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 p-8">
                {registros.length === 0 ? (
                    <div className="col-span-12">
                        <p className="pt-6 text-center">
                            No hay registros de mantenimiento
                        </p>
                    </div>
                ) : (
                    <div className="col-span-12">
                        <div className="overflow-scroll border border-gray-200 rounded-md overflow-x">
                            <table className="w-full min-w-full overflow-scroll divide-y divide-gray-200 table-auto">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {tableHeaders.map((header) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registros.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(
                                                    item.fecha_elaboracion
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.folio}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(item.fecha_ingreso)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(item.fecha_salida)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.taller_asignacion}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.servicio_solicitado}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.servicio_realizado}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatCurrency(
                                                    Number(item.importe)
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.folio_fiscal}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.folio_afectacion}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.estado}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                <Button style="default">
                                                    Editar
                                                </Button>
                                                <Button
                                                    style="red"
                                                    onClick={() => {
                                                        confirm(
                                                            "¿Estás seguro de eliminar este registro?"
                                                        ) &&
                                                            form.delete(
                                                                route(
                                                                    "mantenimiento.destroy",
                                                                    item.id
                                                                ),
                                                                {
                                                                    onFinish:
                                                                        () => {
                                                                            form.reset();
                                                                        },
                                                                }
                                                            );
                                                    }}
                                                >
                                                    Eliminar
                                                </Button>
                                                <Button
                                                    style="yellow"
                                                    onClick={() =>
                                                        handleEditItem(item)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <div className="p-4 bg-white">
                    <label
                        htmlFor="detalle"
                        className="block mb-3 text-xl font-medium text-gray-700"
                    >
                        <b>
                            {isEditMode
                                ? "Editar mantenimiento"
                                : "Agregar mantenimiento"}
                        </b>
                    </label>

                    <form
                        className="col-span-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (isEditMode) {
                                form.put(
                                    route(
                                        "mantenimiento.update",
                                        currentItemId
                                    ),
                                    {
                                        onFinish: () => {
                                            setOpenModal(false);
                                            setIsEditMode(false);
                                            form.reset();
                                        },
                                    }
                                );
                            } else {
                                form.post(route("mantenimiento.store"), {
                                    onFinish: () => {
                                        form.reset();
                                        setOpenModal(false);
                                    },
                                });
                            }
                        }}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <div className="w-full">
                                <InputLabel htmlFor="folio" value="Folio" />
                                <TextInput
                                    id="folio"
                                    type="text"
                                    name="folio"
                                    value={data.folio ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="folio"
                                    onChange={(e) =>
                                        setData("folio", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.folio}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="fecha_elaboracion"
                                    value="Fecha Elaboración"
                                />
                                <TextInput
                                    id="fecha_elaboracion"
                                    type="date"
                                    name="fecha_elaboracion"
                                    value={data.fecha_elaboracion ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="fecha_elaboracion"
                                    onChange={(e) =>
                                        setData(
                                            "fecha_elaboracion",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.fecha_elaboracion}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="fecha_ingreso"
                                    value="Fecha Ingreso"
                                />
                                <TextInput
                                    id="fecha_ingreso"
                                    type="date"
                                    name="fecha_ingreso"
                                    value={data.fecha_ingreso ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="fecha_ingreso"
                                    onChange={(e) =>
                                        setData("fecha_ingreso", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.fecha_ingreso}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="fecha_salida"
                                    value="Fecha Salida"
                                />
                                <TextInput
                                    id="fecha_salida"
                                    type="date"
                                    name="fecha_salida"
                                    value={data.fecha_salida ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="fecha_salida"
                                    onChange={(e) =>
                                        setData("fecha_salida", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.fecha_salida}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="taller_asignacion"
                                    value="Taller asignación"
                                />
                                <TextInput
                                    id="taller_asignacion"
                                    type="text"
                                    name="taller_asignacion"
                                    value={data.taller_asignacion ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="taller_asignacion"
                                    onChange={(e) =>
                                        setData(
                                            "taller_asignacion",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.taller_asignacion}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="servicio_solicitado"
                                    value="Servicio solicitado"
                                />
                                <TextInput
                                    id="servicio_solicitado"
                                    type="text"
                                    name="servicio_solicitado"
                                    value={data.servicio_solicitado ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="servicio_solicitado"
                                    onChange={(e) =>
                                        setData(
                                            "servicio_solicitado",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.servicio_solicitado}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="servicio_realizado"
                                    value="Servicio realidado"
                                />
                                <TextInput
                                    id="servicio_realizado"
                                    type="text"
                                    name="servicio_realizado"
                                    value={data.servicio_realizado ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="servicio_realizado"
                                    onChange={(e) =>
                                        setData(
                                            "servicio_realizado",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.servicio_realizado}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <InputLabel htmlFor="importe" value="Importe" />
                                <TextInput
                                    id="importe"
                                    type="number"
                                    name="importe"
                                    value={data.importe ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="importe"
                                    onChange={(e) =>
                                        setData("importe", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.importe}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="folio_fiscal"
                                    value="Folio Fiscal"
                                />
                                <TextInput
                                    id="folio_fiscal"
                                    type="number"
                                    name="folio_fiscal"
                                    value={data.folio_fiscal ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="folio_fiscal"
                                    onChange={(e) =>
                                        setData("folio_fiscal", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.folio_fiscal}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="folio_afectacion"
                                    value="Folio Afectación"
                                />
                                <TextInput
                                    id="folio_afectacion"
                                    type="text"
                                    name="folio_afectacion"
                                    value={data.folio_afectacion ?? ""}
                                    className="block w-full mt-1"
                                    autoComplete="folio_afectacion"
                                    onChange={(e) =>
                                        setData(
                                            "folio_afectacion",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.folio_afectacion}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-center col-span-2">
                                <div className="w-1/2 ">
                                    <InputLabel
                                        htmlFor="estado"
                                        value="Estado"
                                    />
                                    <select
                                        value={data.estado}
                                        onChange={(e) =>
                                            setData("estado", e.target.value)
                                        }
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {mantenimientoStatus.map((status) => (
                                            <option
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.estado}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center col-span-2 pt-4">
                                <Button
                                    disabled={form.processing}
                                    style="green"
                                    type="submit"
                                >
                                    {isEditMode
                                        ? "Guardar cambios"
                                        : "Agregar mantenimiento"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default MantenimientoTable;
