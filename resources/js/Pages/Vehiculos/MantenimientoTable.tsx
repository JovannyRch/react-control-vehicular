import Button from "@/Components/Button";
import ReportSelector from "@/Components/ReportSelector";
import { Mantenimiento, mantenimientoStatus } from "@/types/Mantenimiento";
import { Vehiculo } from "@/types/Vehiculo";
import { formatCurrency, formatDate, getMonthName } from "@/utils";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import MantenimientoFormModal from "./MantenimientoFormModal";
import { Typography } from "@/Components/Typography";

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
        <div className="p-4 mt-6 bg-[#141E30] shadow-sm sm:rounded-lg ">
            <Typography.Title className="block mb-3 text-xl font-medium text-gray-700">
                <b>
                    Mantenimientos
                    {month && year && (
                        <span>
                            {" "}
                            - {getMonthName(Number(month))} / {year}
                        </span>
                    )}
                </b>
            </Typography.Title>

            <div className="flex items-center justify-end gap-4">
                <div>
                    <ReportSelector fetchData={handleGetReport} />
                </div>
                <div>
                    <Button style="main" onClick={() => setOpenModal(true)}>
                        Agregar mantenimiento
                        <FiPlus />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 p-8">
                {registros.length === 0 ? (
                    <div className="col-span-12">
                        <p className="pt-6 text-center">
                            <Typography.Paragraph>
                                No hay registros para mostrar
                            </Typography.Paragraph>
                        </p>
                    </div>
                ) : (
                    <div className="col-span-12">
                        <div className="border border-gray-500 rounded-md ">
                            <table className="w-full min-w-full divide-y divide-gray-200 table-auto">
                                <thead className="bg-[#141E30]">
                                    <tr>
                                        {tableHeaders.map((header) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-[#141E30] divide-y divide-gray-200">
                                    {registros.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                {formatDate(
                                                    item.fecha_elaboracion
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                {item.folio}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                {formatDate(item.fecha_ingreso)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                {formatDate(item.fecha_salida)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                {item.taller_asignacion}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                {item.servicio_solicitado}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                <Link
                                                    href={route(
                                                        "mantenimiento.show",
                                                        {
                                                            mantenimiento:
                                                                item.id,
                                                        }
                                                    )}
                                                    className="font-bold text-blue-600 hover:text-blue-900"
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
