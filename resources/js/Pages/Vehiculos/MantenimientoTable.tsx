import Button from "@/Components/Button";
import ReportSelector from "@/Components/ReportSelector";
import { Mantenimiento, mantenimientoStatus } from "@/types/Mantenimiento";
import { Vehiculo } from "@/types/Vehiculo";
import { formatCurrency, formatDate, getMonthName } from "@/utils";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import MantenimientoFormModal from "./MantenimientoFormModal";

interface MantenimientoTableProps {
    registros: Mantenimiento[];
    vehiculo: Vehiculo;
    month: string | null;
    year: string | null;
}

const MantenimientoTable = ({
    vehiculo,
    registros = [],
    month,
    year,
}: MantenimientoTableProps) => {
    const [openModal, setOpenModal] = useState(false);

    const tableHeaders = [
        "Fecha elaboración",
        "Folio",
        "Fecha ingreso",
        "Fecha salida",
        "Taller asignación",
        "Servicio solicitado",
        "Acciones",
    ];

    const handleGetReport = ({
        month,
        year,
    }: {
        month: string;
        year: string;
    }) => {
        router.visit(
            `/vehiculos/${vehiculo.id}?maintenance=true&month=${month}&year=${year}`
        );
    };

    return (
        <div className="p-4 mt-6 bg-white shadow-sm sm:rounded-lg sm:mx-8">
            <label
                htmlFor="historial"
                className="block mb-3 text-xl font-medium text-gray-700"
            >
                <b>
                    Mantenimientos
                    {month && year && (
                        <span>
                            {" "}
                            - {getMonthName(Number(month))} / {year}
                        </span>
                    )}
                </b>
            </label>

            <div className="flex items-center justify-end gap-4">
                <div>
                    <ReportSelector fetchData={handleGetReport} />
                </div>
                <div>
                    <Button style="green" onClick={() => setOpenModal(true)}>
                        <FiPlus className="w-6 h-6" />
                        Agregar mantenimiento
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 p-8">
                {registros.length === 0 ? (
                    <div className="col-span-12">
                        <p className="pt-6 text-center">
                            No hay registros de mantenimiento
                        </p>
                    </div>
                ) : (
                    <div className="col-span-12">
                        <div className="overflow-scroll border border-gray-200 rounded-md overflow-x">
                            <table className="w-full min-w-full overflow-scroll divide-y divide-gray-200 table-auto">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {tableHeaders.map((header) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registros.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(
                                                    item.fecha_elaboracion
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.folio}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(item.fecha_ingreso)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(item.fecha_salida)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.taller_asignacion}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {item.servicio_solicitado}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                <Link
                                                    href={route(
                                                        "mantenimiento.show",
                                                        {
                                                            mantenimiento:
                                                                item.id,
                                                        }
                                                    )}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Ver
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <MantenimientoFormModal
                vehiculoId={vehiculo.id}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
};

export default MantenimientoTable;
