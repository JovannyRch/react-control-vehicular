import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Vehiculo } from "@/types/Vehiculo";
import { Historial } from "@/types/Historial";
import { formatDate } from "@/utils";
import InputError from "@/Components/InputError";
import CargasDeCombustible from "./CargasDeCombustible";
import Detalles from "./Detalles";
import HistorialTable from "./HistorialTable";
import { CargaCombustible } from "@/types/CargaCombustible";
import Button from "@/Components/Button";

interface VehiculosProps extends PageProps {
    vehiculo: Vehiculo;
    historial: Historial[];
    cargas: CargaCombustible[];
    loadFuel: boolean;
}

export default function Show({
    auth,
    vehiculo,
    historial,
    cargas,
    loadFuel,
}: VehiculosProps) {
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

            <div className="flex justify-center">
                <div className="y-12 max-w-[1200px]">
                    <Detalles vehiculo={vehiculo} />
                    {loadFuel &&
                        (vehiculo.plantilla !== "propia" ||
                            (vehiculo.plantilla === "propia" &&
                                vehiculo.estado === "vigente")) && (
                            <CargasDeCombustible
                                cargas={cargas}
                                vehiculo={vehiculo}
                            />
                        )}
                    {!loadFuel && (
                        <HistorialTable
                            vehiculo={vehiculo}
                            historial={historial}
                            loadFuel={loadFuel}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
