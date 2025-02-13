import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
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
import { Factura } from "@/types/Factura";
import { Accesorio } from "@/types/Accesorio";
import Accesorios from "./Accesorios";

interface VehiculosProps extends PageProps {
    vehiculo: Vehiculo;
    historial: Historial[];
    cargas: CargaCombustible[];
    cargasDisponibles: CargaCombustible[];
    loadFuel: boolean;
    month: string | null;
    year: string | null;
    maintenance: boolean;
    tools: boolean;
    mantenimientos: Mantenimiento[];
    facturas: Factura[];
    accesorios: Accesorio[];
}

export default function Show({
    auth,
    vehiculo,
    historial,
    cargas,
    cargasDisponibles,
    loadFuel = false,
    month,
    year,
    maintenance = false,
    tools = false,
    mantenimientos,
    facturas,
    accesorios,
}: VehiculosProps) {
    const { props } = usePage();
    const { message } = props;

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
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Vehículo
                </h2>
            }
        >
            <Head title="Vehículos" />

            {(message as String) && (
                <div
                    className="relative px-4 py-3 text-center text-green-700 bg-green-100 border border-green-400 rounded"
                    role="alert"
                >
                    <span className="block text-center sm:inline w-100">
                        {message as String}
                    </span>
                </div>
            )}

            <div className="flex justify-center">
                <div className="max-w-[1200px]">
                    <Detalles
                        vehiculo={vehiculo}
                        month={month}
                        year={year}
                        loadFuel={loadFuel}
                        maintenance={maintenance}
                        tools={tools}
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
                                cargasDisponibles={cargasDisponibles}
                                facturas={facturas}
                            />
                        )}

                    {maintenance && (
                        <MantenimientoTable
                            vehiculo={vehiculo}
                            registros={mantenimientos}
                            month={month}
                            year={year}
                        />
                    )}

                    {tools && (
                        <Accesorios
                            vehiculoId={vehiculo.id}
                            accesorios={accesorios}
                        />
                    )}

                    {!loadFuel && !maintenance && !tools && (
                        <HistorialTable
                            user={auth.user}
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
