import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Files = ({ auth }: PageProps) => {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!excelFile) return;

        const formData = new FormData();
        formData.append("excel_file", excelFile);
        setIsLoading(true);

        axios
            .post(route("generate.pega.tickets"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: "blob",
            })
            .then((response) => {
                const fileName = response.headers["content-disposition"]
                    .split("filename=")[1]
                    .replace(/"/g, "");

                const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: "application/zip" })
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Packages
                </h2>
            }
        >
            <Head title="Packages" />
            <div className="max-w-2xl p-6 mx-auto my-8 bg-white rounded-md shadow-md">
                <h1 className="mb-4 text-2xl font-semibold text-center text-gray-700">
                    Subir Archivo EXCEL
                </h1>
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
                                Selecciona un archivo
                            </span>
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                className="hidden"
                                onChange={(e) => {
                                    setExcelFile(e.target.files?.[0] || null);
                                    /*  setPackages([]); */
                                }}
                                required
                            />
                        </label>
                    </div>
                    {excelFile && (
                        <>
                            <h1 className="mt-4 mb-2 text-2xl font-bold text-gray-700">
                                {excelFile?.name}
                            </h1>

                            <button
                                type="submit"
                                disabled={!excelFile || isLoading}
                                className="w-full px-4 py-2 mt-4 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                            >
                                {isLoading ? "Generando..." : "Generar Tickets"}
                                {isLoading && (
                                    <AiOutlineLoading3Quarters className="inline-block w-6 h-6 ml-2 animate-spin" />
                                )}
                            </button>
                        </>
                    )}
                </form>
                <div>
                    {/*   {pdfs.length > 0 && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold text-gray-700">
                                Archivos generados:
                            </h2>
                            <ul className="space-y-2">
                                {pdfs.map((pdf, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm"
                                    >
                                        <a
                                            href={pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 text-sm font-medium text-white transition duration-300 ease-in-out bg-green-500 rounded-md hover:bg-green-600"
                                        >
                                            Ver PDF {index + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Files;
