import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import axios from "axios";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Files = ({ auth }: PageProps) => {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [groups, setGroups] = useState([]);
    const [processing, setProcessing] = useState<boolean>(false);
    const [firstProcessing, setFirstProcessing] = useState(false);
    const [currentProcessingFile, setCurrentProcessingFile] = useState("");

    async function mergePdfs(pdfFiles: any[]) {
        const mergedPdf = await PDFDocument.create();

        for (const pdfFile of pdfFiles) {
            const pdfBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(
                pdfDoc,
                pdfDoc.getPageIndices()
            );
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        return mergedPdfBytes;
    }

    async function downloadMergedPdf() {
        setProcessing(true);
        const pdfFiles: any[] = [];
        let index = 1;
        for (const group of groups) {
            setCurrentProcessingFile(String(index));
            const pdf = await axios
                .get(`/generate-pdf/${encodeURIComponent(group)}`, {
                    responseType: "blob",
                })
                .then((response) => response.data);
            pdfFiles.push(pdf);
            index++;
        }

        const mergedPdfBytes = await mergePdfs(pdfFiles);
        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        const originalFileName = excelFile?.name.split(".")[0];
        link.download = `${originalFileName}.pdf`;
        setProcessing(false);
        link.click();
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!excelFile) return;
        const formData = new FormData();
        formData.append("excel_file", excelFile);
        setFirstProcessing(true);
        axios
            .post(route("generate.links.pega.tickets"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setGroups(response.data.groups);
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
            })
            .finally(() => {
                setFirstProcessing(false);
            });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Generar PegaTickets" />
            <div className="max-w-2xl p-6 mx-auto my-8 bg-white rounded-md shadow-md">
                <h1 className="mb-4 text-2xl font-semibold text-center text-gray-700">
                    Generar PegaTickets
                </h1>
                {!processing && (
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="flex items-center justify-center">
                            <label className="flex flex-col items-center w-full px-4 py-6 tracking-wide text-blue-500 uppercase transition duration-300 ease-in-out bg-white border border-blue-500 rounded-lg shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white">
                                <svg
                                    className="w-8 h-8"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M16.88 9.94a1.5 1.5 0 00-2.12 0l-2.17 2.17V3.5a1.5 1.5 0 00-3 0v8.61l-2.17-2.17a1.5 1.5 0 10-2.12 2.12l5 5a1.5 1.5 0 002.12 0l5-5a1.5 1.5 0 000-2.12z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">
                                    Selecciona archivo Excel
                                </span>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    className="hidden"
                                    onChange={(e) => {
                                        setExcelFile(
                                            e.target.files?.[0] || null
                                        );
                                        setGroups([]);
                                    }}
                                    required
                                />
                            </label>
                        </div>
                        {excelFile && !processing && (
                            <>
                                <h1 className="mt-4 mb-2 text-2xl font-bold text-gray-700">
                                    {excelFile?.name}
                                </h1>
                                <button
                                    type="submit"
                                    disabled={!excelFile || firstProcessing}
                                    className="w-full px-4 py-2 mt-4 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                                >
                                    {firstProcessing
                                        ? "Procesando..."
                                        : "Procesar archivo"}
                                </button>
                            </>
                        )}
                    </form>
                )}
                <div>
                    {groups.length > 0 && (
                        <>
                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={() => downloadMergedPdf()}
                                    disabled={processing}
                                    className="px-3 py-1 text-sm font-medium text-white transition duration-300 ease-in-out bg-green-500 rounded-md hover:bg-green-600"
                                >
                                    {processing
                                        ? `Generando pega ticket ${currentProcessingFile} de ${groups.length}`
                                        : `Descargar ${groups.length} pega tickets`}
                                </button>
                            </div>
                            <div className="flex justify-center mb-4">
                                {processing && (
                                    <AiOutlineLoading3Quarters className="inline-block w-6 h-6 ml-2 animate-spin" />
                                )}
                            </div>

                            {/*  <ul className="space-y-2">
                                {groups.map((groupKey) => (
                                    <li
                                        key={groupKey}
                                        className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm"
                                    >
                                        <span className="text-gray-800">
                                            Pega ticket {groupKey}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleDownload(groupKey)
                                            }
                                            className="px-3 py-1 text-sm font-medium text-white transition duration-300 ease-in-out bg-green-500 rounded-md hover:bg-green-600"
                                        >
                                            Descargar PDF
                                        </button>
                                    </li>
                                ))}
                            </ul> */}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Files;
