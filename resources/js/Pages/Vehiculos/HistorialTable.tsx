import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import RoundedIconButton from "@/Components/RoundedIconButton";
import { Typography } from "@/Components/Typography";
import { Historial } from "@/types/Historial";
import { Vehiculo } from "@/types/Vehiculo";
import { formatDate } from "@/utils";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PiPlus } from "react-icons/pi";

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
        <div className="p-4 mt-6 bg-[#141E30] shadow-sm sm:rounded-lg ">
            <div className="flex justify-between">
                <Typography.Title className="block mb-3 text-xl font-medium text-gray-700">
                    <b>Historial</b>
                </Typography.Title>
                {!loadFuel && (
                    <div className="flex justify-end">
                        <Button onClick={() => setIsModalOpen(true)}>
                            Agregar suceso
                            <PiPlus />
                        </Button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-12 gap-6 p-8">
                {historial.length === 0 ? (
                    <div className="col-span-12">
                        <p className="pt-6 text-center">
                            <Typography.Title>
                                No hay historial de sucesos
                            </Typography.Title>
                        </p>
                    </div>
                ) : (
                    <div className="col-span-12">
                        <div className="overflow-hidden border border-gray-800 rounded-md">
                            <table className="min-w-full divide-y divide-gray-500">
                                <thead className="bg-[#141E30]">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
                                        >
                                            Suceso
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
                                        >
                                            Fecha
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#141E30] divide-y divide-gray-600">
                                    {historial.map((historial) => (
                                        <tr key={historial.id}>
                                            <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
                                                {historial.detalle}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
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
                <div className="p-4 bg-[#141E30]">
                    <Typography.Title className="block mb-3 text-xl font-medium text-gray-700">
                        Agregar suceso
                    </Typography.Title>

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
                            <div className="flex-1">
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
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="flex items-center h-max">
                                <Button
                                    disabled={
                                        form.processing ||
                                        form.data.detalle === ""
                                    }
                                    style="main"
                                    type="submit"
                                >
                                    Agregar
                                    <PiPlus />
                                </Button>
                            </div>
                        </div>
                        <InputError message={form.errors.detalle} />
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default HistorialTable;
