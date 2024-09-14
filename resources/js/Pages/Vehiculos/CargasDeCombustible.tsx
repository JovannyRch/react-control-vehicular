import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { CargaCombustible } from "@/types/CargaCombustible";
import { Vehiculo } from "@/types/Vehiculo";
import { formatCurrency, formatDate } from "@/utils";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

interface CargasProps {
    cargas: CargaCombustible[];
    vehiculo: Vehiculo;
}

const CargasDeCombustible = ({ cargas, vehiculo }: CargasProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm({
        fecha: new Date().toISOString().split("T")[0],
        litros: "",
        importe: "",
        vehiculo_id: vehiculo.id,
    });

    return (
        <div className="p-4 mt-6 bg-white shadow-sm sm:rounded-lg sm:mx-8">
            <label
                htmlFor="historial"
                className="block mb-3 text-xl font-medium text-gray-700"
            >
                <b>Cargas de combustible</b>
            </label>
            <div className="flex justify-end">
                <Button style="green" onClick={() => setIsModalOpen(true)}>
                    Agregar carga
                </Button>
            </div>
            <div className="grid grid-cols-12 gap-6 p-8">
                {cargas.length === 0 ? (
                    <div className="col-span-12 text-center">
                        <p className="text-center">
                            No hay cargas de combustible registradas
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
                                            Litros
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Importe
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
                                    {cargas.map((carga) => (
                                        <tr key={carga.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {carga.litros} litros
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatCurrency(carga.importe)}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(carga.fecha)}
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
                        <b>Agregar carga de combustible</b>
                    </label>

                    <form
                        className="col-span-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.post(route("carga_combustible.store"), {
                                onFinish: () => {
                                    form.reset("litros", "importe", "fecha");
                                    setIsModalOpen(false);
                                },
                            });
                        }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <div>
                                <InputLabel htmlFor="litros" value="Litros" />
                                <TextInput
                                    id="litros"
                                    type="number"
                                    name="litros"
                                    value={form.data.litros}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("litros", e.target.value)
                                    }
                                />
                                <InputError
                                    message={form.errors.litros}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="importe" value="Importe" />
                                <TextInput
                                    id="importe"
                                    type="number"
                                    name="importe"
                                    value={form.data.importe}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData(
                                            "importe",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.importe}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="fecha" value="Fecha" />
                                <TextInput
                                    id="importe"
                                    type="date"
                                    name="importe"
                                    value={form.data.fecha}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("fecha", e.target.value)
                                    }
                                />
                                <InputError
                                    message={form.errors.fecha}
                                    className="mt-2"
                                />
                            </div>

                            <Button
                                disabled={form.processing}
                                style="green"
                                type="submit"
                            >
                                Agregar
                            </Button>
                        </div>
                        <InputError message={form.errors.fecha} />
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CargasDeCombustible;
