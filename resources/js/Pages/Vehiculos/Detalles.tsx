import BackButton from "@/Components/BackButton";
import Button from "@/Components/Button";
import { Vehiculo } from "@/types/Vehiculo";
import { AiOutlineDownload } from "react-icons/ai";

interface DetallesProps {
    vehiculo: Vehiculo;
    month: string | null;
    year: string | null;
    loadFuel: boolean;
    maintenance: boolean;
    readonly?: boolean;
}

const Field = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex gap-2">
            <label className="block text-sm font-medium text-gray-700 min-w-[130px]">
                {label}
            </label>
            <p className="text-sm text-gray-500">{value ?? "-"}</p>
        </div>
    );
};

const Detalles = ({
    vehiculo,
    month,
    year,
    loadFuel,
    maintenance,
    readonly = false,
}: DetallesProps) => {
    return (
        <div className="mx-8 bg-white shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
            <div className="flex justify-between pt-4 mt-4">
                <label
                    htmlFor="historial"
                    className="block mb-3 text-xl font-medium text-gray-700"
                >
                    <b>Detalles del vehículo</b>
                </label>
                {!readonly && (
                    <div className="flex gap-1">
                        <BackButton />
                        <Button
                            onClick={() =>
                                window.open(
                                    route("vehiculo.pdf", {
                                        vehiculo: vehiculo.id,
                                        ...(month && year && { month, year }),
                                        ...(loadFuel && { loadFuel: true }),
                                        ...(maintenance && {
                                            maintenance: true,
                                        }),
                                    }),
                                    "_blank"
                                )
                            }
                            className="flex items-center gap-2"
                            style="dark"
                        >
                            Generar PDF
                            <AiOutlineDownload />
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                    <Field label="ID" value={vehiculo.id} />
                    <Field label="CIV" value={vehiculo.civ ?? ""} />
                    <Field
                        label="Número Económico"
                        value={vehiculo.numero_economico}
                    />
                    <Field label="Marca" value={vehiculo.marca} />
                    <Field label="Tipo" value={vehiculo.tipo} />
                    <Field label="Modelo" value={vehiculo.modelo} />
                    <Field label="Placa" value={vehiculo.placa} />
                    <Field label="No. Serie" value={vehiculo.no_serie} />
                    <Field label="No. Motor" value={vehiculo.no_motor} />
                    <Field
                        label="Área de asignación"
                        value={vehiculo.area_asignacion}
                    />
                    <Field label="Resguardante" value={vehiculo.resguardante} />

                    <Field label="Plantilla" value={vehiculo.plantilla} />
                    {vehiculo.plantilla === "propia" && (
                        <Field label="Estado" value={vehiculo.estado} />
                    )}
                    <div className="col-span-3">
                        <Field label="Detalle" value={vehiculo.detalle} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detalles;
