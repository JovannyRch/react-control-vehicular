import Button from "@/Components/Button";
import Dropdown from "@/Components/Dropdown";
import MainColorContainer from "@/Components/MainColorContainer";
import Modal from "@/Components/Modal";
import { Typography } from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Vehiculo } from "@/types/Vehiculo";
import { Head } from "@inertiajs/react";
import { useState } from "react";

interface MantenimientosCreateProps extends PageProps {
    vehiculos: Vehiculo[];
}

const MantenimientosCreate = ({
    vehiculos,
    auth,
}: MantenimientosCreateProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Solicitud de mantenimiento" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <MainColorContainer className="overflow-hidden shadow-sm sm:rounded-lg min-h-[500px] p-6">
                        <Typography.Title className="text-2xl font-semibold ">
                            Crear solicitud de mantenimiento
                        </Typography.Title>
                        <div className="mt-4">
                            <Button onClick={() => setIsModalOpen(true)}>
                                Seleccionar auto
                            </Button>
                        </div>
                    </MainColorContainer>
                </div>
            </div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    CIV
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Número económico
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Placa
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Serie
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Marca
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-gray-50">
                            {vehiculos.map((vehiculo) => (
                                <tr key={vehiculo.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {vehiculo.marca}{" "}
                                                    {vehiculo.modelo}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {vehiculo.placa}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default MantenimientosCreate;
