import { Accesorio } from "@/types/Accesorio";
import { formatOnlyDateValue } from "@/utils";
import { useState } from "react";
import AddAccesorioModal from "./AddAccesorioModal";
import Button from "@/Components/Button";
import { FiPlus } from "react-icons/fi";
import { useForm } from "@inertiajs/react";
import { FaDeleteLeft, FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

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
        "Detalle",
        "Persona encargada",
        "Persona entregada",
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
                className="p-6 mt-6 mb-8 bg-white shadow-sm sm:rounded-lg sm:mx-8"
                id="cargas_combustibles"
            >
                <label
                    htmlFor="historial"
                    className="block mb-3 text-xl font-medium text-gray-700"
                >
                    <b>Accesorios</b>
                </label>
                <div className="flex items-center justify-end gap-4">
                    <div>
                        <Button
                            style="green"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FiPlus className="w-6 h-6" />
                            Agregar accesorio
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-6 p-8">
                    {lista.length === 0 ? (
                        <div className="col-span-12 text-center">
                            <p className="text-center">
                                No hay registros para mostrar
                                <br />
                            </p>
                        </div>
                    ) : (
                        <div className="col-span-12">
                            <div className="overflow-hidden border border-gray-200 rounded-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        {
                                            <tr>
                                                {headers.map((header) => (
                                                    <th
                                                        key={header}
                                                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        }
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {lista.map((accesorio) => (
                                            <tr key={accesorio.id}>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {formatOnlyDateValue(
                                                        accesorio.fecha
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {accesorio.folio || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {accesorio.detalle || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {accesorio.persona_encargada ||
                                                        "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {accesorio.persona_entregada ||
                                                        "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    <Button
                                                        style="red"
                                                        onClick={() =>
                                                            handleDelete(
                                                                accesorio
                                                            )
                                                        }
                                                    >
                                                        <FaTrashCan />
                                                    </Button>
                                                    <Button
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
