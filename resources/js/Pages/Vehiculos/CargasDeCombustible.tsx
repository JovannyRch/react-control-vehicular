import AddInvoiceModal from "@/Components/AddInvoiceModal";
import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InvoicesSelectorModal from "@/Components/InvoicesSelectorModal";
import Modal from "@/Components/Modal";
import ReportSelector from "@/Components/ReportSelector";
import TextInput from "@/Components/TextInput";
import { Typography } from "@/Components/Typography";
import { CargaCombustible } from "@/types/CargaCombustible";
import { Factura } from "@/types/Factura";
import { Vehiculo } from "@/types/Vehiculo";
import {
    formatCurrency,
    formatNumber,
    formatOnlyDateValue,
    getMonthName,
} from "@/utils";
import { getKm, getRendimiento, safeReduceSum } from "@/utils/index";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { PiInvoice, PiSeal } from "react-icons/pi";

interface CargasProps {
    cargas: CargaCombustible[];
    vehiculo: Vehiculo;
    month: string | null;
    year: string | null;
    cargasDisponibles: CargaCombustible[];
    facturas: Factura[];
}

const CargasDeCombustible = ({
    cargas,
    vehiculo,
    month,
    year,
    cargasDisponibles,
    facturas,
}: CargasProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isSelectInvoiceModalOpen, setIsSelectInvoiceModalOpen] =
        useState(false);

    const form = useForm({
        fecha: new Date().toISOString().split("T")[0],
        litros: "",
        importe: "",
        vehiculo_id: vehiculo.id,
        odometro: "",
        folio: "",
        conductor: "",
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

    const showInvoiceFeatures = cargas.length > 0 && month && year;

    return (
        <div
            className="p-6 mt-6 mb-8 bg-[#141E30] shadow-sm sm:rounded-lg"
            id="cargas_combustibles"
        >
            <Typography.Title className="block mb-3 text-xl font-medium ">
                Cargas de combustible
                {month && year && (
                    <>
                        {" "}
                        de <b>{`${getMonthName(Number(month))} ${year}`}</b>
                    </>
                )}
            </Typography.Title>
            <div className="flex justify-end">
                <div className="flex items-center gap-1">
                    <ReportSelector fetchData={handleGetReport} />
                    <div>
                        <Button
                            style="main"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Agregar carga
                            <GrAdd />
                        </Button>
                    </div>
                    {showInvoiceFeatures && (
                        <>
                            <div>
                                <Button
                                    style="main"
                                    onClick={() => setIsInvoiceModalOpen(true)}
                                >
                                    Agregar factura
                                    <PiInvoice />
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style="main"
                                    onClick={() =>
                                        setIsSelectInvoiceModalOpen(true)
                                    }
                                >
                                    Pega ticket
                                    <PiSeal />
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6 p-8">
                {cargas.length === 0 ? (
                    <div className="col-span-12 text-center">
                        <Typography.Paragraph className="text-center">
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
                        </Typography.Paragraph>
                    </div>
                ) : (
                    <div className="col-span-12">
                        <div className="overflow-hidden border border-gray-200 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#141E30]">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Folio
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Fecha
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Importe
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Litros
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Odom Ini
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Odom Fin
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Kilómetros
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Rendimiento
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                                        >
                                            Conductor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#141E30] divide-y divide-gray-200">
                                    {cargas.map((carga) => (
                                        <tr key={carga.id}>
                                            <td className="px-6 py-4 text-sm font-bold text-white whitespace-nowrap">
                                                {carga.folio || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {formatOnlyDateValue(
                                                    carga.fecha
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {formatCurrency(carga.importe)}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {carga.litros} l
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {isNaN(carga?.odometro_inicial!)
                                                    ? carga.odometro_inicial
                                                    : formatNumber(
                                                          carga.odometro_inicial,
                                                          "km"
                                                      )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {isNaN(carga?.odometro_final!)
                                                    ? carga.odometro_final
                                                    : formatNumber(
                                                          carga.odometro_final,
                                                          "km"
                                                      )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {getKm(carga)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {getRendimiento(carga)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {carga.conductor ?? "-"}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-[#141E30]">
                                        <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
                                            <b>Total</b>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
                                            <b>
                                                {cargas.length === 1
                                                    ? "1 carga"
                                                    : `${cargas.length} cargas`}
                                            </b>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
                                            <b>
                                                {formatCurrency(
                                                    totales.importe
                                                )}
                                            </b>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
                                            <b>
                                                {formatNumber(
                                                    totales.litros,
                                                    "l"
                                                )}
                                            </b>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap"></td>
                                        <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap"></td>
                                        <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
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
                <div className="p-4 bg-[#141E30]">
                    <Typography.Title className="mb-4">
                        Agregar carga de combustible
                    </Typography.Title>

                    <form
                        className="col-span-4"
                        onSubmit={(e) => {
                            e.preventDefault();

                            form.post(route("carga_combustible.store"), {
                                onSuccess: () => {
                                    form.reset(
                                        "litros",
                                        "importe",
                                        "fecha",
                                        "odometro",
                                        "folio"
                                    );
                                    setIsModalOpen(false);
                                },
                                onError: (error) => {
                                    console.log("error", error);
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
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
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
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
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
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.fecha}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <div>
                                <InputLabel
                                    htmlFor="odometro"
                                    value="Odometro"
                                />
                                <TextInput
                                    id="odometro"
                                    type="text"
                                    name="odometro"
                                    value={form.data.odometro}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData("odometro", e.target.value)
                                    }
                                />

                                <span className="text-xs text-gray-400">
                                    El valor debe ser mayor al último registrado
                                </span>
                                <InputError
                                    message={form.errors.odometro?.replace(
                                        "The odometro field must be greater than",
                                        "El campo odometro debe ser mayor a"
                                    )}
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
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.folio}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="conductor"
                                    value="Conductor"
                                />
                                <TextInput
                                    id="conductor"
                                    type="text"
                                    name="conductor"
                                    value={form.data.conductor}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        form.setData(
                                            "conductor",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-xs text-gray-400">
                                    &nbsp;
                                </span>
                                <InputError
                                    message={form.errors.conductor}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="justify-end mt-5 display w-100 ">
                            <Button disabled={form.processing} type="submit">
                                Agregar
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <AddInvoiceModal
                open={isInvoiceModalOpen}
                onClose={() => setIsInvoiceModalOpen(false)}
                vehiculoId={vehiculo.id}
                cargasDisponibles={cargasDisponibles}
            />
            <InvoicesSelectorModal
                open={isSelectInvoiceModalOpen}
                onClose={() => setIsSelectInvoiceModalOpen(false)}
                facturas={facturas}
                month={Number(month)}
                year={year!}
            />
        </div>
    );
};

export default CargasDeCombustible;
