import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Vehiculo } from "@/types/Vehiculo";
import { Historial } from "@/types/Historial";
import { formatDate } from "@/utils";
import InputError from "@/Components/InputError";

interface VehiculosProps extends PageProps {
    vehiculo: Vehiculo;
    historial: Historial[];
}

export default function Create({ auth, vehiculo, historial }: VehiculosProps) {
    const form = useForm({
        detalle: "",
        vehiculo_id: vehiculo.id,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Vehículo #{vehiculo.id}
                </h2>
            }
        >
            <Head title="Vehículos" />

            <div className="py-12">
                <div className="sm:px-6 lg:px-8">
                    <div className="flex justify-center overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="justify-center w-full px-6 py-4 mt-6 overflow-hidden sm:rounded-lg">
                            <div className="grid grid-cols-6 gap-6">
                                {/* ID */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        ID
                                    </label>
                                    <input
                                        type="text"
                                        name="id"
                                        id="id"
                                        autoComplete="id"
                                        value={vehiculo.id}
                                        readOnly
                                        disabled
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="numero_economico"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Número Económico
                                    </label>
                                    <input
                                        type="text"
                                        name="numero_economico"
                                        id="numero_economico"
                                        autoComplete="numero_economico"
                                        value={vehiculo.numero_economico}
                                        readOnly
                                        disabled
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="marca"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Marca
                                    </label>
                                    <input
                                        type="text"
                                        name="marca"
                                        id="marca"
                                        disabled
                                        autoComplete="marca"
                                        value={vehiculo.marca}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="tipo"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tipo
                                    </label>
                                    <input
                                        type="text"
                                        name="tipo"
                                        id="tipo"
                                        disabled
                                        autoComplete="tipo"
                                        value={vehiculo.tipo}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="modelo"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Modelo
                                    </label>
                                    <input
                                        type="text"
                                        name="modelo"
                                        disabled
                                        id="modelo"
                                        autoComplete="modelo"
                                        value={vehiculo.modelo}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="placa"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Placa
                                    </label>
                                    <input
                                        type="text"
                                        name="placa"
                                        id="placa"
                                        disabled
                                        autoComplete="placa"
                                        value={vehiculo.placa}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* # serie */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="no_serie"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        No. Serie
                                    </label>
                                    <input
                                        type="text"
                                        name="no_serie"
                                        id="no_serie"
                                        disabled
                                        autoComplete="no_serie"
                                        value={vehiculo.no_serie}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* # motor */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="no_motor"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        No. Motor
                                    </label>
                                    <input
                                        type="text"
                                        name="no_motor"
                                        id="no_motor"
                                        disabled
                                        autoComplete="no_motor"
                                        value={vehiculo.no_motor}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Area asignacion */}

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="area_asignacion"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Area de asignación
                                    </label>
                                    <input
                                        type="text"
                                        name="area_asignacion"
                                        id="area_asignacion"
                                        disabled
                                        autoComplete="area_asignacion"
                                        value={vehiculo.area_asignacion}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Resguardante */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="resguardante"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Resguardante
                                    </label>
                                    <input
                                        type="text"
                                        name="resguardante"
                                        id="resguardante"
                                        disabled
                                        autoComplete="resguardante"
                                        value={vehiculo.resguardante}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="plantilla"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Plantilla
                                    </label>
                                    <input
                                        type="text"
                                        name="plantilla"
                                        id="plantilla"
                                        disabled
                                        autoComplete="plantilla"
                                        value={vehiculo.plantilla}
                                        readOnly
                                        className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {vehiculo.plantilla === "propia" && (
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="estado"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Estado
                                        </label>
                                        <input
                                            type="text"
                                            name="estado"
                                            id="estado"
                                            disabled
                                            autoComplete="estado"
                                            value={vehiculo.estado}
                                            readOnly
                                            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                )}

                                {/* Detalle */}

                                {vehiculo.detalle && (
                                    <div className="col-span-12 sm:col-span-6">
                                        <label
                                            htmlFor="detalle"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Detalles del vehículo
                                        </label>
                                        <textarea
                                            name="detalle"
                                            id="detalle"
                                            disabled
                                            autoComplete="detalle"
                                            readOnly
                                            rows={5}
                                            value={vehiculo.detalle}
                                            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        ></textarea>
                                    </div>
                                )}
                                {/* divider */}
                                <div className="col-span-12">
                                    <hr className="my-4" />
                                </div>
                                {historial.length === 0 ? (
                                    <div className="col-span-12 sm:col-span-6">
                                        <p className="text-center">
                                            No hay historial de sucesos
                                        </p>
                                    </div>
                                ) : (
                                    <div className="col-span-12 sm:col-span-6">
                                        <label
                                            htmlFor="historial"
                                            className="block mb-3 text-sm font-medium text-gray-700"
                                        >
                                            Historial
                                        </label>
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
                                                    {historial.map(
                                                        (historial) => (
                                                            <tr
                                                                key={
                                                                    historial.id
                                                                }
                                                            >
                                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                                    {
                                                                        historial.detalle
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                                    {formatDate(
                                                                        historial.created_at
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                <form
                                    className="col-span-12 sm:col-span-6"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        form.post(route("historial.store"), {
                                            onFinish: () => {
                                                form.reset("detalle");
                                            },
                                        });
                                    }}
                                >
                                    <label
                                        htmlFor="detalle"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Agregar suceso
                                    </label>
                                    <div className="flex items-center justify-center gap-2">
                                        <input
                                            type="text"
                                            name="detalle"
                                            id="detalle"
                                            autoComplete="detalle"
                                            value={form.data.detalle}
                                            onChange={(e) => {
                                                form.setData(
                                                    "detalle",
                                                    e.target.value
                                                );
                                            }}
                                            required
                                            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />

                                        <button
                                            disabled={
                                                form.processing ||
                                                form.data.detalle === ""
                                            }
                                            type="submit"
                                            className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                                        >
                                            Agregar
                                        </button>
                                    </div>
                                    <InputError message={form.errors.detalle} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
