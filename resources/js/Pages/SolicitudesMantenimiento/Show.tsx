import MainColorContainer from "@/Components/MainColorContainer";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";
import { Typography } from "@/Components/Typography";
import { formatDate, formatNumber } from "@/utils";
import { Vehiculo } from "@/types/Vehiculo";
import { Mantenimiento, mantenimientoStatusMap } from "@/types/Mantenimiento";

interface Props extends PageProps {
    solicitud: any;
    vehiculo: Vehiculo;
    mantenimiento?: Mantenimiento | null;
}

const Show = ({ auth, solicitud, vehiculo, mantenimiento }: Props) => {
    console.log("solicitud", solicitud);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Matenimientos" />
            <div className="py-6">
                <div className="flex justify-center mx-auto sm:px-6 lg:px-8">
                    <MainColorContainer className="overflow-hidden shadow-sm sm:rounded-lg min-h-[500px]  p-4 px-8 w-full">
                        <Typography.Title className="block mb-3 text-xl font-medium text-gray-700">
                            <b>Solicitud de mantenimiento</b>
                        </Typography.Title>

                        <div className="gap-4 p-4 mt-4 border border-gray-200 rounded-lg max-w-[50%] ">
                            <Typography.Subtitle>
                                Información del vehículo
                            </Typography.Subtitle>
                            <div className="grid grid-cols-2">
                                <Typography.Paragraph>
                                    ID:{" "}
                                    <Link
                                        href={`/vehiculos/${vehiculo.id}?maintenance=true`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {vehiculo.id}
                                    </Link>
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    Marca: {vehiculo.marca}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    Modelo: {vehiculo.modelo}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    CIV: {vehiculo.civ}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    # Económico: {vehiculo.numero_economico}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    Placa: {vehiculo.placa}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    Plantilla: {vehiculo.plantilla}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    # Motor: {vehiculo.no_motor}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    # Serie: {vehiculo.no_serie}
                                </Typography.Paragraph>
                            </div>
                        </div>

                        <div className="gap-4 p-4 mt-4 border border-gray-200 rounded-lg max-w-[50%] ">
                            <Typography.Subtitle>
                                Información de la solicitud
                            </Typography.Subtitle>
                            <div className="grid grid-cols-2">
                                <Typography.Paragraph>
                                    <b>Fecha elaboración:</b>{" "}
                                    {formatDate(solicitud.created_at)}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    <b>Kilometraje:</b>{" "}
                                    {formatNumber(solicitud.kilometraje)} km
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    <b>Ubicación:</b> {solicitud.ubicacion}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    <b>Requerimientos y/o servicios:</b>{" "}
                                    {solicitud.requerimientos}
                                </Typography.Paragraph>
                            </div>
                        </div>

                        {solicitud.imagenes.length > 0 && (
                            <div className="grid grid-cols-12 gap-6 p-8">
                                <div className="col-span-12">
                                    <Typography.Title className="block mb-3 text-xl font-medium text-gray-700">
                                        <b>Imágenes</b>
                                    </Typography.Title>
                                </div>
                                {solicitud.imagenes.map(
                                    (image: any, index: number) => (
                                        <div
                                            key={index}
                                            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
                                        >
                                            <img
                                                src={image}
                                                alt="imagen"
                                                className="object-cover w-full h-full rounded-md shadow-md"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {mantenimiento && (
                            <div className="gap-4 p-4 mt-4 border border-gray-200 rounded-lg max-w-[50%] ">
                                <Typography.Subtitle>
                                    Información del mantenimiento
                                </Typography.Subtitle>
                                <div className="grid grid-cols-2">
                                    <Typography.Paragraph>
                                        <b>Id:</b>{" "}
                                        <Link
                                            className="text-blue-500 hover:underline"
                                            href={`/mantenimiento/${mantenimiento.id}`}
                                        >
                                            {mantenimiento.id}
                                        </Link>
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <b>Fecha elaboración:</b>{" "}
                                        {formatDate(
                                            mantenimiento.fecha_elaboracion
                                        )}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <b>Folio:</b> {mantenimiento.folio}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <b>Fecha ingreso:</b>{" "}
                                        {formatDate(
                                            mantenimiento.fecha_ingreso
                                        )}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <b>Fecha salida:</b>{" "}
                                        {formatDate(mantenimiento.fecha_salida)}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <b>Taller asignación:</b>{" "}
                                        {mantenimiento.taller_asignacion}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <b>Servicio solicitado:</b>{" "}
                                        {mantenimiento.servicio_solicitado}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <b>Estatus:</b>{" "}
                                        {
                                            mantenimientoStatusMap[
                                                mantenimiento.estado
                                            ]
                                        }
                                    </Typography.Paragraph>
                                </div>
                            </div>
                        )}
                    </MainColorContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
