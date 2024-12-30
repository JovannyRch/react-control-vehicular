import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { Typography } from "@/Components/Typography";
import { Mantenimiento, mantenimientoStatus } from "@/types/Mantenimiento";
import {
    formatOnlyDateValue,
    generateDate,
    getCurrentDateOfMexico,
} from "@/utils";
import { useForm } from "@inertiajs/react";
import { BiSave } from "react-icons/bi";

interface MantenimientoFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    currentItemId?: string;
    isEditMode?: boolean;
    vehiculoId: string;
    mantenimiento?: Mantenimiento;
}

const MantenimientoFormModal = ({
    isOpen,
    onClose,
    currentItemId,
    vehiculoId,
    isEditMode = false,
    mantenimiento,
    onSuccess,
}: MantenimientoFormModalProps) => {
    const today = getCurrentDateOfMexico();

    const form = useForm(
        isEditMode && mantenimiento
            ? {
                  vehiculo_id: vehiculoId,
                  fecha_elaboracion: generateDate(
                      mantenimiento.fecha_elaboracion
                  ),
                  folio: mantenimiento.folio,
                  fecha_ingreso: generateDate(mantenimiento.fecha_ingreso),
                  fecha_salida: generateDate(mantenimiento.fecha_salida),
                  taller_asignacion: mantenimiento.taller_asignacion,
                  servicio_solicitado: mantenimiento.servicio_solicitado,
                  servicio_realizado: mantenimiento.servicio_realizado,
                  importe: mantenimiento.importe,
                  folio_fiscal: mantenimiento.folio_fiscal,
                  folio_afectacion: mantenimiento.folio_afectacion,
                  estado: mantenimiento.estado,
              }
            : {
                  vehiculo_id: vehiculoId,
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
              }
    );

    const { data, setData, errors } = form;

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-4 bg-[#141E30]">
                <Typography.Title className="block mb-3 text-xl font-medium text-gray-700">
                    {isEditMode
                        ? "Editar mantenimiento"
                        : "Agregar mantenimiento"}
                </Typography.Title>

                <form
                    className="col-span-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isEditMode) {
                            form.put(
                                route("mantenimiento.update", currentItemId),
                                {
                                    onFinish: () => {
                                        onClose();
                                        onSuccess?.();
                                    },
                                }
                            );
                        } else {
                            form.post(route("mantenimiento.store"), {
                                onFinish: () => {
                                    onClose();
                                    onSuccess?.();
                                    form.reset();
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
                                    setData("fecha_elaboracion", e.target.value)
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
                                    setData("taller_asignacion", e.target.value)
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
                                value="Servicio realizado"
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
                                type="text"
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
                                    setData("folio_afectacion", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.folio_afectacion}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-center col-span-2">
                            <div className="w-1/2 ">
                                <InputLabel htmlFor="estado" value="Estado" />
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
                            <Button disabled={form.processing} type="submit">
                                {isEditMode
                                    ? "Guardar cambios"
                                    : "Agregar mantenimiento"}
                                <BiSave />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default MantenimientoFormModal;
