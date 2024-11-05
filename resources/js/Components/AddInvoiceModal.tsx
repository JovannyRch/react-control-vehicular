import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import Button from "./Button";
import axios from "axios";
import { CargaCombustible } from "@/types/CargaCombustible";
import { formatCurrency } from "@/utils";

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
            <div className="p-4 bg-white">
                <label
                    htmlFor="detalle"
                    className="block mb-3 text-xl font-medium text-gray-700"
                >
                    <b>Agregar factura</b>
                </label>

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
                            />
                            <InputError
                                message={form.errors.folio}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <InputLabel htmlFor="" value="Seleccione cargas" />
                        <ul>
                            {cargasDisponibles.map((carga) => (
                                <li key={carga.id}>
                                    <input
                                        className="mr-3"
                                        type="checkbox"
                                        value={carga.id}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                form.setData("cargas", [
                                                    ...form.data.cargas,
                                                    carga.id,
                                                ]);
                                            } else {
                                                form.setData(
                                                    "cargas",
                                                    form.data.cargas.filter(
                                                        (c) => c !== carga.id
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                    {carga.folio} - {carga.fecha} -
                                    {formatCurrency(carga.importe)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-5 text-center">
                        <Button
                            disabled={
                                form.processing ||
                                form.data.cargas.length === 0 ||
                                form.data.folio === ""
                            }
                            style="green"
                            type="submit"
                        >
                            Agregar
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddInvoiceModal;
