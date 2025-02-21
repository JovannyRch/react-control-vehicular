import { Accesorio } from "@/types/Accesorio";
import { formatOnlyDateValue } from "@/utils";
import { useState } from "react";
import AddAccesorioModal from "./AddAccesorioModal";
import Button from "@/Components/Button";
import { FiPlus } from "react-icons/fi";
import { useForm } from "@inertiajs/react";
import { FaDeleteLeft, FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { Typography } from "@/Components/Typography";
import RoundedIconButton from "@/Components/RoundedIconButton";

interface AccesoriosProps {
    accesorios: Accesorio[];
    vehiculoId: string;
}

const Accesorios = ({ accesorios: lista, vehiculoId }: AccesoriosProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedAccesorio, setSelectedAccesorio] = useState<
        Accesorio | undefined
    >(undefined);

    const form = useForm();

    const headers = [
        "Fecha",
        "Folio",
        "Persona que entrega",
        "Persona que recibe",
        "Accesorios entregados",
        "Acciones",
    ];

    const handleDelete = (accesorio: Accesorio) => {
        if (confirm("¿Estás seguro de eliminar este accesorio?")) {
            form.delete(route("accesorio.destroy", accesorio.id));
        }
    };

    return (
        <>
            <div
                className="p-6 mt-6 mb-8 bg-[#141E30] shadow-sm sm:rounded-lg "
                id="cargas_combustibles"
            >
                <Typography.Title className="block mb-3 text-xl font-medium ">
                    Accesorios
                </Typography.Title>
                <div className="flex items-center justify-end gap-4">
                    <div>
                        <Button onClick={() => setIsModalOpen(true)}>
                            Agregar accesorio
                            <FiPlus />
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-6 p-8">
                    {lista.length === 0 ? (
                        <div className="col-span-12 text-center">
                            <p className="text-center">
                                <Typography.Paragraph>
                                    No hay registros para mostrar
                                </Typography.Paragraph>
                                <br />
                            </p>
                        </div>
                    ) : (
                        <div className="col-span-12">
                            <div className="overflow-hidden border border-gray-500 rounded-md">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-[#141E30]">
                                        {
                                            <tr>
                                                {headers.map((header) => (
                                                    <th
                                                        key={header}
                                                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        }
                                    </thead>
                                    <tbody className="bg-[#141E30] divide-y divide-gray-400">
                                        {lista.map((accesorio) => (
                                            <tr key={accesorio.id}>
                                                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {formatOnlyDateValue(
                                                        accesorio.fecha
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {accesorio.folio || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {accesorio.detalle || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {accesorio.persona_encargada ||
                                                        "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {accesorio.persona_entregada ||
                                                        "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <RoundedIconButton
                                                            type="red"
                                                            tooltip="Eliminar"
                                                            name="delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    accesorio
                                                                )
                                                            }
                                                        >
                                                            <FaTrashCan />
                                                        </RoundedIconButton>
                                                        <RoundedIconButton
                                                            type="yellow"
                                                            tooltip="Editar"
                                                            name="edit"
                                                            onClick={() => {
                                                                setSelectedAccesorio(
                                                                    accesorio
                                                                );
                                                                setIsModalOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <FaPen />
                                                        </RoundedIconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <AddAccesorioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                vehiculoId={vehiculoId}
                accesorio={selectedAccesorio}
                isEditMode={selectedAccesorio !== undefined}
                onSuccess={() => {
                    setSelectedAccesorio(undefined);
                }}
            />
        </>
    );
};

export default Accesorios;
