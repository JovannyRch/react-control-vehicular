import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { Historial } from "@/types/Historial";
import { Vehiculo } from "@/types/Vehiculo";
import { formatDate } from "@/utils";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface HistorialProps {
    historial: Historial[];
    vehiculo: Vehiculo;
    loadFuel: boolean;
}

const HistorialTable = ({ historial, vehiculo, loadFuel }: HistorialProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm({
        detalle: "",
        vehiculo_id: vehiculo.id,
    });

    return (
        <div className="p-4 mt-6 bg-white shadow-sm sm:rounded-lg sm:mx-8">
            <label
                htmlFor="historial"
                className="block mb-3 text-xl font-medium text-gray-700"
            >
                <b>Historial</b>
            </label>
            {!loadFuel && (
                <div className="flex justify-end">
                    <Button style="green" onClick={() => setIsModalOpen(true)}>
                        Agregar suceso
                    </Button>
                </div>
            )}
            <div className="grid grid-cols-12 gap-6 p-8">
                {historial.length === 0 ? (
                    <div className="col-span-12">
                        <p className="pt-6 text-center">
                            No hay historial de sucesos
                        </p>
                    </div>
                ) : (
                    <div className="col-span-12">
                        <div className="overflow-hidden border border-gray-200 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Suceso
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Fecha
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {historial.map((historial) => (
                                        <tr key={historial.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {historial.detalle}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(
                                                    historial.created_at
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-4 bg-white">
                    <label
                        htmlFor="detalle"
                        className="block mb-3 text-xl font-medium text-gray-700"
                    >
                        <b>Agregar suceso</b>
                    </label>

                    <form
                        className="col-span-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.post(route("historial.store"), {
                                onFinish: () => {
                                    form.reset("detalle");
                                    setIsModalOpen(false);
                                },
                            });
                        }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <input
                                type="text"
                                name="detalle"
                                id="detalle"
                                autoComplete="detalle"
                                value={form.data.detalle}
                                onChange={(e) => {
                                    form.setData("detalle", e.target.value);
                                }}
                                required
                                className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />

                            <Button
                                disabled={
                                    form.processing || form.data.detalle === ""
                                }
                                style="green"
                                type="submit"
                            >
                                Agregar
                            </Button>
                        </div>
                        <InputError message={form.errors.detalle} />
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default HistorialTable;
