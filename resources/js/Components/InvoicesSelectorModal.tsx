import { getMonthName } from "@/utils";
import Modal from "./Modal";
import { Factura } from "@/types/Factura";

interface InvoicesSelectorModalProps {
    open: boolean;
    onClose: () => void;
    facturas: Factura[];
    month: number;
    year: string;
}

const InvoicesSelectorModal = ({
    open,
    onClose,
    facturas,
    month,
    year,
}: InvoicesSelectorModalProps) => {
    return (
        <Modal show={open} onClose={onClose}>
            <div className="p-4 bg-white">
                <label
                    htmlFor="detalle"
                    className="block mb-3 text-xl font-medium text-gray-700"
                >
                    <b>
                        Facturas de {getMonthName(month)} {year}
                    </b>
                </label>

                {facturas.length > 0 && (
                    <>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Folio
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturas.map((factura) => (
                                        <tr
                                            key={factura.id}
                                            className="bg-white hover:bg-gray-50"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                            >
                                                {factura.folio}
                                            </th>

                                            <td className="px-6 py-4 text-right">
                                                <div
                                                    onClick={() => {
                                                        window.open(
                                                            route(
                                                                "vehiculo.pega_ticket",
                                                                {
                                                                    factura:
                                                                        factura.id,
                                                                }
                                                            ),
                                                            "_blank"
                                                        );
                                                        onClose();
                                                    }}
                                                    className="flex items-center gap-4 font-medium text-blue-600 cursor-pointer"
                                                >
                                                    Generar pega ticket
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {facturas.length === 0 && (
                    <div className="text-center text-gray-400">
                        No hay facturas
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default InvoicesSelectorModal;
