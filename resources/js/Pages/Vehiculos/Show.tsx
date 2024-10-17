import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Vehiculo } from "@/types/Vehiculo";
import { Historial } from "@/types/Historial";
import CargasDeCombustible from "./CargasDeCombustible";
import Detalles from "./Detalles";
import HistorialTable from "./HistorialTable";
import { CargaCombustible } from "@/types/CargaCombustible";
import Button from "@/Components/Button";
import { useEffect } from "react";
import MantenimientoTable from "./MantenimientoTable";
import { Mantenimiento } from "@/types/Mantenimiento";

interface VehiculosProps extends PageProps {
    vehiculo: Vehiculo;
    historial: Historial[];
    cargas: CargaCombustible[];
    loadFuel: boolean;
    month: string | null;
    year: string | null;
    maintenance: boolean;
    mantenimientos: Mantenimiento[];
}

export default function Show({
    auth,
    vehiculo,
    historial,
    cargas,
    loadFuel = false,
    month,
    year,
    maintenance = false,
    mantenimientos,
}: VehiculosProps) {
    useEffect(() => {
        if (loadFuel) {
            setTimeout(() => {
                const element = document.getElementById("cargas_combustibles");
                element?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, []);

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
                    <Detalles
                        vehiculo={vehiculo}
                        month={month}
                        year={year}
                        loadFuel={loadFuel}
                        maintenance={maintenance}
                    />
                    {loadFuel &&
                        (vehiculo.plantilla !== "propia" ||
                            (vehiculo.plantilla === "propia" &&
                                vehiculo.estado === "vigente")) && (
                            <CargasDeCombustible
                                cargas={cargas}
                                vehiculo={vehiculo}
                                month={month}
                                year={year}
                            />
                        )}

                    {maintenance && (
                        <MantenimientoTable
                            vehiculo={vehiculo}
                            registros={mantenimientos}
                        />
                    )}
                    {!loadFuel && !maintenance && (
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
