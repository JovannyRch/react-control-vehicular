import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import Button from "./Button";
import axios from "axios";
import { CargaCombustible } from "@/types/CargaCombustible";
import { formatCurrency, formatDate } from "@/utils";
import { Typography } from "./Typography";

interface AddInvoiceModalProps {
    open: boolean;
    onClose: () => void;
    vehiculoId: string;
    cargasDisponibles: CargaCombustible[];
}

const AddInvoiceModal = ({
    vehiculoId,
    open,
    onClose,
    cargasDisponibles,
}: AddInvoiceModalProps) => {
    const form = useForm<{ folio: string; cargas: number[] }>({
        folio: "",
        cargas: [],
    });

    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-4 bg-[#141E30]">
                <Typography.Title className="mb-4">
                    Agregar factura
                </Typography.Title>

                <form
                    className="col-span-4"
                    onSubmit={(e) => {
                        e.preventDefault();

                        form.post(
                            route("factura.store", {
                                vehiculo: vehiculoId,
                            }),
                            {
                                onFinish: () => {
                                    form.reset("folio");
                                    form.reset("cargas");
                                    onClose();
                                },
                            }
                        );
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div>
                            <InputLabel htmlFor="folio" value="Folio" />
                            <TextInput
                                id="folio"
                                min={0}
                                name="folio"
                                value={form.data.folio}
                                className="block w-full mt-1"
                                onChange={(e) =>
                                    form.setData("folio", e.target.value)
                                }
                                disabled={cargasDisponibles.length === 0}
                            />
                            <InputError
                                message={form.errors.folio}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {cargasDisponibles.length > 0 && (
                        <div className="mt-3">
                            <InputLabel
                                htmlFor=""
                                value="Seleccione cargas disponibles"
                            />

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[350px] overflow-y-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-xs text-gray-100 uppercase bg-[#141E30]">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Folio
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Fecha
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Litros
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Importe
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Seleccionar
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cargasDisponibles.map((carga) => (
                                            <tr
                                                key={carga.id}
                                                className="bg-white hover:bg-gray-50"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                                >
                                                    {carga.folio ?? "-"}
                                                </th>

                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                                >
                                                    {formatDate(carga.fecha)}
                                                </th>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                                >
                                                    {carga.litros}
                                                </th>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                                >
                                                    {formatCurrency(
                                                        carga.importe
                                                    )}
                                                </th>

                                                <td className="px-6 py-4 text-right">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-blue-600 form-checkbox"
                                                        checked={form.data.cargas.includes(
                                                            carga.id
                                                        )}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                form.setData(
                                                                    "cargas",
                                                                    form.data.cargas.concat(
                                                                        carga.id
                                                                    )
                                                                );
                                                            } else {
                                                                form.setData(
                                                                    "cargas",
                                                                    form.data.cargas.filter(
                                                                        (id) =>
                                                                            id !==
                                                                            carga.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {cargasDisponibles.length === 0 && (
                        <div className="text-center text-gray-400 h-[80px] flex items-center justify-center">
                            <div>No hay cargas disponibles</div>
                        </div>
                    )}

                    <div className="flex justify-end mt-8">
                        <Button
                            disabled={
                                form.processing ||
                                form.data.cargas.length === 0 ||
                                form.data.folio === ""
                            }
                            style="green"
                            type="submit"
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddInvoiceModal;
