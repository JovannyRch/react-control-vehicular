import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { Typography } from "@/Components/Typography";
import { Accesorio } from "@/types/Accesorio";
import { Mantenimiento, mantenimientoStatus } from "@/types/Mantenimiento";
import { generateDate, getCurrentDateOfMexico } from "@/utils";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { BiSave } from "react-icons/bi";

interface MantenimientoFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    isEditMode?: boolean;
    vehiculoId: string;
    accesorio: Accesorio | undefined;
}

const AddAccesorioModal = ({
    isOpen,
    onClose,
    vehiculoId,
    isEditMode = false,
    accesorio,
    onSuccess,
}: MantenimientoFormModalProps) => {
    const today = getCurrentDateOfMexico();

    const form = useForm({
        fecha: today,
        folio: "",
        detalle: "",
        persona_encargada: "",
        persona_entregada: "",
        vehiculo_id: parseInt(vehiculoId),
    });

    const { data, setData, errors } = form;

    useEffect(() => {
        if (isEditMode && isOpen && accesorio) {
            setData({
                fecha: accesorio.fecha,
                folio: accesorio.folio,
                detalle: accesorio.detalle,
                persona_encargada: accesorio.persona_encargada,
                persona_entregada: accesorio.persona_entregada,
                vehiculo_id: parseInt(vehiculoId),
            });
        }

        if (!isEditMode && isOpen) {
            setData({
                fecha: today,
                folio: "",
                detalle: "",
                persona_encargada: "",
                persona_entregada: "",
                vehiculo_id: parseInt(vehiculoId),
            });
        }
    }, [isOpen, isEditMode]);

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-4 bg-[#141E30]">
                <Typography.Title className="block mb-3 text-xl font-medium ">
                    {isEditMode ? "Editar accesorio" : "Agregar accesorio"}
                </Typography.Title>

                <form
                    className="col-span-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isEditMode) {
                            form.put(route("accesorio.update", accesorio?.id), {
                                onFinish: () => {
                                    onClose();
                                    onSuccess?.();
                                },
                            });
                        } else {
                            form.post(route("accesorio.store"), {
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
                            <InputLabel htmlFor="fecha" value="Fecha" />
                            <TextInput
                                id="fecha"
                                type="date"
                                name="fecha"
                                value={data.fecha ?? ""}
                                className="block w-full mt-1"
                                autoComplete="fecha"
                                onChange={(e) =>
                                    setData("fecha", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.fecha}
                                className="mt-2"
                            />
                        </div>
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
                                htmlFor="persona_encargada"
                                value="Persona que entrega"
                            />
                            <TextInput
                                id="persona_encargada"
                                type="text"
                                name="persona_encargada"
                                value={data.persona_encargada ?? ""}
                                className="block w-full mt-1"
                                autoComplete="persona_encargada"
                                onChange={(e) =>
                                    setData("persona_encargada", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.persona_encargada}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full">
                            <InputLabel
                                htmlFor="persona_entregada"
                                value="Persona que recibe"
                            />
                            <TextInput
                                id="persona_entregada"
                                type="text"
                                name="persona_entregada"
                                value={data.persona_entregada ?? ""}
                                className="block w-full mt-1"
                                autoComplete="persona_entregada"
                                onChange={(e) =>
                                    setData("persona_entregada", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.persona_entregada}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full col-span-2">
                            <InputLabel
                                htmlFor="detalle"
                                value="Accesorios entregados"
                            />
                            <TextInput
                                id="detalle"
                                type="text"
                                name="detalle"
                                value={data.detalle ?? ""}
                                className="block w-full mt-1"
                                autoComplete="detalle"
                                onChange={(e) =>
                                    setData("detalle", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.detalle}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-center col-span-2 pt-4">
                            <Button disabled={form.processing} type="submit">
                                {isEditMode
                                    ? "Guardar cambios"
                                    : "Guardar accesorio"}
                                <BiSave />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddAccesorioModal;
