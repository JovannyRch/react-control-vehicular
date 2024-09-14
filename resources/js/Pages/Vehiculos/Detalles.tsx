import Button from "@/Components/Button";
import { Vehiculo } from "@/types/Vehiculo";
import { AiOutlineDownload } from "react-icons/ai";

interface DetallesProps {
    vehiculo: Vehiculo;
}

const Detalles = ({ vehiculo }: DetallesProps) => {
    return (
        <div className="mx-8 bg-white shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
            <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:rounded-lg">
                <div className="flex justify-between mb-4">
                    <label
                        htmlFor="historial"
                        className="block mb-3 text-xl font-medium text-gray-700"
                    >
                        <b>Detalles del vehículo</b>
                    </label>
                    <Button
                        onClick={() =>
                            window.open(
                                route("vehiculo.pdf", {
                                    vehiculo: vehiculo.id,
                                }),
                                "_blank"
                            )
                        }
                        className="flex items-center gap-3"
                    >
                        Generar PDF
                        <AiOutlineDownload />
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                        <div>
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
                    <div className="col-span-3">
                        <label
                            htmlFor="detalle"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Detalles
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
                </div>
            </div>
        </div>
    );
};

export default Detalles;
