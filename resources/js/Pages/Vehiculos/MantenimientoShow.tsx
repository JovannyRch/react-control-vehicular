import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Vehiculo } from "@/types/Vehiculo";
import Detalles from "./Detalles";
import { Mantenimiento } from "@/types/Mantenimiento";
import BackButton from "@/Components/BackButton";
import DetallesMantenimiento from "./DetallesMantenimiento";

interface VehiculosProps extends PageProps {
    vehiculo: Vehiculo;
    mantenimiento: Mantenimiento;
}

export default function MantenimientoShow({
    auth,
    vehiculo,
    mantenimiento,
}: VehiculosProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Vehículo #{vehiculo.id}
                </h2>
            }
        >
            <Head title="Mantenimiento" />

            <div className="flex justify-center">
                <div className="y-12 max-w-[1200px]">
                    <DetallesMantenimiento
                        vehiculo={vehiculo}
                        mantenimiento={mantenimiento}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
