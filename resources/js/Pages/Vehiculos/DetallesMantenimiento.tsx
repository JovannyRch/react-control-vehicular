import BackButton from "@/Components/BackButton";
import Button from "@/Components/Button";
import { Mantenimiento, mantenimientoStatusMap } from "@/types/Mantenimiento";
import { Vehiculo } from "@/types/Vehiculo";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import MantenimientoFormModal from "./MantenimientoFormModal";
import { formatCurrency, formatDate } from "@/utils";

interface DetallesProps {
    vehiculo: Vehiculo;
    mantenimiento: Mantenimiento;
}

const Field = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex gap-2">
            <label className="block text-sm font-medium text-gray-700 min-w-[130px]">
                {label}
            </label>
            <p className="text-sm text-gray-500">{value ?? "-"}</p>
        </div>
    );
};

const DetallesMantenimiento = ({ vehiculo, mantenimiento }: DetallesProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const form = useForm({
        vehiculo_id: vehiculo.id,
    });

    const handleDelete = () => {
        if (confirm("¿Estás seguro de eliminar este mantenimiento?")) {
            form.delete(route("mantenimiento.destroy", mantenimiento.id), {
                onFinish: () => {
                    window.history.back();
                },
            });
        }
    };

    const fields = [
        {
            label: "Fecha elaboración",
            value: formatDate(mantenimiento.fecha_elaboracion),
        },
        {
            label: "Fecha ingreso",
            value: formatDate(mantenimiento.fecha_ingreso),
        },
        {
            label: "Fecha salida",
            value: formatDate(mantenimiento.fecha_salida),
        },
        {
            label: "N. Folio",
            value: mantenimiento.folio,
        },
        {
            label: "Taller de asignación",
            value: mantenimiento.folio,
        },
        {
            label: "Servicio solicitado",
            value: mantenimiento.servicio_solicitado,
        },
        {
            label: "Servicio realizado",
            value: mantenimiento.servicio_realizado,
        },
        {
            label: "Importe",
            value: formatCurrency(Number(mantenimiento.importe)),
        },
        {
            label: "Folio Fiscal",
            value: mantenimiento.folio_fiscal,
        },
        {
            label: "Folio Afectación",
            value: mantenimiento.folio_afectacion,
        },
        {
            label: "Status",
            value: mantenimientoStatusMap[mantenimiento.estado],
        },
    ];

    const vehiculoFields = [
        {
            label: "ID",
            value: vehiculo.id.toString(),
        },
        {
            label: "CIV",
            value: vehiculo.civ ?? "-",
        },
        {
            label: "Número Económico",
            value: vehiculo.numero_economico,
        },
        {
            label: "Marca",
            value: vehiculo.marca,
        },
        {
            label: "Tipo",
            value: vehiculo.tipo,
        },
        {
            label: "Modelo",
            value: vehiculo.modelo,
        },
        {
            label: "Placa",
            value: vehiculo.placa,
        },
        {
            label: "No. Serie",
            value: vehiculo.no_serie,
        },
    ];

    return (
        <div className="mx-8 bg-white shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
            <div className="flex justify-end pt-4 mt-4">
                <div className="flex gap-1">
                    <BackButton />
                    <Button style="red" onClick={handleDelete}>
                        Eliminar
                    </Button>
                    <Button onClick={() => setIsEditModalOpen(true)}>
                        Editar
                    </Button>
                </div>
            </div>

            <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:rounded-lg">
                <h2>
                    <b>Vehículo</b>
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    {vehiculoFields.map((field, index) => (
                        <Field
                            key={index}
                            label={field.label}
                            value={field.value}
                        />
                    ))}
                </div>
            </div>
            <hr className="my-4 border-gray-200" />

            <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:rounded-lg">
                <h2 className="mb-4">
                    <b>Mantenimiento</b>
                </h2>
                <br />
                <div className="grid grid-cols-3 gap-4">
                    {fields.map((field, index) => (
                        <Field
                            key={index}
                            label={field.label}
                            value={field.value}
                        />
                    ))}
                </div>
            </div>
            <MantenimientoFormModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                vehiculoId={vehiculo.id}
                isEditMode
                mantenimiento={mantenimiento}
                currentItemId={mantenimiento.id}
                onSuccess={() => {
                    window.location.reload();
                }}
            />
        </div>
    );
};

export default DetallesMantenimiento;
