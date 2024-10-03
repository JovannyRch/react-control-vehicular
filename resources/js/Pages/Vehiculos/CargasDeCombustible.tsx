import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import ReportSelector from "@/Components/ReportSelector";
import TextInput from "@/Components/TextInput";
import { CargaCombustible } from "@/types/CargaCombustible";
import { Vehiculo } from "@/types/Vehiculo";
import {
    formatCurrency,
    formatNumber,
    formatOnlyDateValue,
    getMonthName,
} from "@/utils";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { PiSeal } from "react-icons/pi";

interface CargasProps {
    cargas: CargaCombustible[];
    vehiculo: Vehiculo;
    month: string | null;
    year: string | null;
}

const getKm = (carga: CargaCombustible) => {
    if (carga.odometro_final === null || isNaN(carga.odometro_final)) {
        return "-";
    }

    if (carga.odometro_inicial === null || isNaN(carga.odometro_inicial)) {
        return "-";
    }

    return `${Number(carga.odometro_final - carga.odometro_inicial)} km`;
};

const getRendimiento = (carga: CargaCombustible) => {
    if (carga.odometro_final === null || isNaN(carga.odometro_final)) {
        return "";
    }

    if (carga.odometro_inicial === null || isNaN(carga.odometro_inicial)) {
        return "";
    }

    if (carga.litros === null || isNaN(carga.litros)) {
        return "";
    }

    if (carga.litros === 0) {
        return "";
    }

    return `${(
        Number(carga.odometro_final - carga.odometro_inicial) / carga.litros
    ).toFixed(2)} km/l`;
};

const safeReduceSum = (a: number, b: string | number) => {
    if (isNaN(Number(b))) {
        return a;
    }

    return a + Number(b);
};

const CargasDeCombustible = ({
    cargas,
    vehiculo,
    month,
    year,
}: CargasProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm({
        fecha: new Date().toISOString().split("T")[0],
        litros: "",
        importe: "",
        vehiculo_id: vehiculo.id,
        odometro_final: "",
        odometro_inicial: "",
        folio: "",
    });

    const handleGetReport = ({
        month,
        year,
    }: {
        month: string;
        year: string;
    }) => {
        router.visit(
            `/vehiculos/${vehiculo.id}?loadFuel=true&month=${month}&year=${year}`
        );
    };

    useEffect(() => {
        if (Object.keys(form.errors).length > 0) {
            setIsModalOpen(true);
        }
    }, [form.errors]);

    const totales = useMemo(() => {
        return {
            litros: cargas.reduce(
                (acc, carga) => safeReduceSum(acc, carga.litros),
                0
            ),
            importe: cargas.reduce(
                (acc, carga) => safeReduceSum(acc, carga.importe),
                0
            ),
            odometro_inicial: cargas.reduce(
                (acc, carga) => safeReduceSum(acc, carga.odometro_inicial!),
                0
            ),
            odometro_final: cargas.reduce(
                (acc, carga) => safeReduceSum(acc, carga.odometro_final!),
                0
            ),
            km: cargas.reduce(
                (acc, carga) =>
                    safeReduceSum(
                        acc,
                        carga.odometro_final! - carga.odometro_inicial!
                    ),
                0
            ),
        };
    }, [cargas]);

    return (
        <div
            className="p-6 mt-6 mb-8 bg-white shadow-sm sm:rounded-lg sm:mx-8"
            id="cargas_combustibles"
        >
            <label
                htmlFor="historial"
                className="block mb-3 text-xl font-medium text-gray-700"
            >
                <b>
                    Cargas de combustible
                    {month && year && (
                        <>
                            {" "}
                            de <b>{`${getMonthName(Number(month))} ${year}`}</b>
                        </>
                    )}
                </b>
            </label>
            <div className="flex justify-end">
                <div className="flex items-center gap-1">
                    {month && year && cargas.length > 0 && (
                        <div>
                            <Button
                                style="green"
                                onClick={() =>
                                    window.open(
                                        route("vehiculo.pega_ticket", {
                                            vehiculo: vehiculo.id,
                                            month,
                                            year,
                                        }),
                                        "_blank"
                                    )
                                }
                            >
                                Pega ticket
                                <PiSeal />
                            </Button>
                        </div>
                    )}
                    <ReportSelector fetchData={handleGetReport} />
                    <div>
                        <Button
                            style="green"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Agregar carga
                            <GrAdd />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6 p-8">
                {cargas.length === 0 ? (
                    <div className="col-span-12 text-center">
                        <p className="text-center">
                            No hay cargas de combustible registradas
                            <br />
                            {month && year && (
                                <>
                                    <b>
                                        {`${getMonthName(
                                            Number(month)
                                        )} ${year}`}
                                    </b>
                                </>
                            )}
                        </p>
                    </div>
                ) : (
                    <div className="col-span-12">
                        <div className="overflow-hidden border border-gray-200 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Folio
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Fecha
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Importe
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Litros
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Odom Ini
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Odom Fin
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Kilómetros
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Rendimiento
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cargas.map((carga) => (
                                        <tr key={carga.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {carga.folio || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatOnlyDateValue(
                                                    carga.fecha
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatCurrency(carga.importe)}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {carga.litros} litros
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {isNaN(carga?.odometro_inicial!)
                                                    ? carga.odometro_inicial
                                                    : formatNumber(
                                                          carga.odometro_inicial,
                                                          "km"
                                                      )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {isNaN(carga?.odometro_final!)
                                                    ? carga.odometro_final
                                                    : formatNumber(
                                                          carga.odometro_final,
                                                          "km"
                                                      )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {getKm(carga)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {getRendimiento(carga)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-100">
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <b>Total</b>
                                        </td>
                                        <td></td>

                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <b>
                                                {formatCurrency(
                                                    totales.importe
                                                )}
                                            </b>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <b>
                                                {formatNumber(
                                                    totales.litros,
                                                    "litros"
                                                )}
                                            </b>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"></td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"></td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <b>
                                                {formatNumber(totales.km, "km")}
                                            </b>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-4 bg-white">
                    <label
                        htmlFor="detalle"
                        className="block mb-3 text-xl font-medium text-gray-700"
                    >
                        <b>Agregar carga de combustible</b>
                    </label>

                    <form
                        className="col-span-4"
                        onSubmit={(e) => {
                            e.preventDefault();

                            form.post(route("carga_combustible.store"), {
                                onFinish: () => {
                                    form.reset(
                                        "litros",
                                        "importe",
                                        "fecha",
                                        "odometro_final",
                                        "odometro_inicial",
                                        "folio"
                                    );
                                    setIsModalOpen(false);
                                },
                            });
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div>
                                <InputLabel htmlFor="litros" value="Litros" />
                                <TextInput
                                    id="litros"
                                    min={0}
                                    name="litros"
                                    value={form.data.litros}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("litros", e.target.value)
                                    }
                                />
                                <InputError
                                    message={form.errors.litros}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="importe" value="Importe" />
                                <TextInput
                                    id="importe"
                                    name="importe"
                                    min={0}
                                    value={form.data.importe}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("importe", e.target.value)
                                    }
                                />
                                <InputError
                                    message={form.errors.importe}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="fecha" value="Fecha" />
                                <TextInput
                                    id="importe"
                                    type="date"
                                    name="importe"
                                    value={form.data.fecha}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("fecha", e.target.value)
                                    }
                                />
                                <InputError
                                    message={form.errors.fecha}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <div>
                                <InputLabel
                                    htmlFor="odometro_inicial"
                                    value="Odómetro inicial"
                                />
                                <TextInput
                                    id="odometro_inicial"
                                    type="text"
                                    name="odometro_inicial"
                                    value={form.data.odometro_inicial}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData(
                                            "odometro_inicial",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.odometro_inicial}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="odometro_final"
                                    value="Odómetro final"
                                />
                                <TextInput
                                    id="odometro_final"
                                    type="text"
                                    name="odometro_final"
                                    value={form.data.odometro_final}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData(
                                            "odometro_final",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.odometro_final}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="folio" value="Folio" />
                                <TextInput
                                    id="folio"
                                    type="text"
                                    name="folio"
                                    value={form.data.folio}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("folio", e.target.value)
                                    }
                                />
                                <InputError
                                    message={form.errors.folio}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <Button
                                disabled={form.processing}
                                style="green"
                                type="submit"
                            >
                                Agregar
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CargasDeCombustible;
