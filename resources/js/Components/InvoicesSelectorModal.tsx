import { getMonthName } from "@/utils";
import Modal from "./Modal";
import { Factura } from "@/types/Factura";
import { Typography } from "./Typography";

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
            <div className="p-4 bg-[#141E30]">
                <Typography.Title className="mb-4">
                    Facturas de {getMonthName(month)} {year}
                </Typography.Title>

                {facturas.length > 0 && (
                    <>
                        <div className="relative overflow-y-auto shadow-md sm:rounded-lg max-h-[350px] ">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
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
                                            className="bg-gray-200 hover:bg-gray-100"
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
                    <div className="text-center text-gray-400 h-[80px] flex items-center justify-center">
                        <div>Nos se encontraron facturas</div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default InvoicesSelectorModal;
