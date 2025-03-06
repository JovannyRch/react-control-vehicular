import MainColorContainer from "@/Components/MainColorContainer";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Mantenimiento } from "@/types/Mantenimiento";
import { Head, Link } from "@inertiajs/react";
import { Typography } from "@/Components/Typography";
import { formatDate } from "@/utils";
import Button from "@/Components/Button";

interface Props extends PageProps {
    pagination: any;
}

const tableHeaders = [
    "Fecha elaboración",
    "Folio",
    "Fecha ingreso",
    "Fecha salida",
    "Taller asignación",
    "Servicio solicitado",
    "Acciones",
];

const Index = ({ auth, pagination }: Props) => {
    const registros: Mantenimiento[] = pagination.data;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Matenimientos" />
            <div className="py-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <MainColorContainer className="overflow-hidden shadow-sm sm:rounded-lg min-h-[500px]  p-4 px-8 w-full">
                        <Typography.Title className="block mb-3 text-xl font-medium text-gray-700">
                            <b>Mantenimientos Plantilla 2023</b>
                        </Typography.Title>
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
                                                    {tableHeaders.map(
                                                        (header) => (
                                                            <th
                                                                key={header}
                                                                scope="col"
                                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                                            >
                                                                {header}
                                                            </th>
                                                        )
                                                    )}
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
                                                            {formatDate(
                                                                item.fecha_ingreso
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                            {formatDate(
                                                                item.fecha_salida
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                            {
                                                                item.taller_asignacion
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                            {
                                                                item.servicio_solicitado
                                                            }
                                                        </td>

                                                        <td className="flex gap-2 px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                            <Link
                                                                href={route(
                                                                    "mantenimiento.show",
                                                                    {
                                                                        mantenimiento:
                                                                            item.id,
                                                                    }
                                                                )}
                                                            >
                                                                <Button>
                                                                    Detalles
                                                                </Button>
                                                            </Link>

                                                            <Link
                                                                href={route(
                                                                    "solicitudes-mantenimiento.show",
                                                                    {
                                                                        solicitudMantenimiento:
                                                                            item.solicitud_mantenimiento_id,
                                                                    }
                                                                )}
                                                            >
                                                                <Button>
                                                                    Solicitud
                                                                </Button>
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
                    </MainColorContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
