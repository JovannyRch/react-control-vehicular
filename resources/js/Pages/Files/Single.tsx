import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import axios from "axios";
import { useState } from "react";

const Files = ({ auth }: PageProps) => {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [groups, setGroups] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!csvFile) return;

        const formData = new FormData();
        formData.append("csv_file", csvFile);

        axios
            .post("/upload-csv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // Actualizar la lista de grupos
                setGroups(response.data.groups);
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
            });
    };

    const handleDownload = (groupKey: string) => {
        axios
            .get(`/download-pdf/${encodeURIComponent(groupKey)}`, {
                responseType: "blob",
            })
            .then((response) => {
                const fileName = response.headers["content-disposition"]
                    .split("filename=")[1]
                    .replace(/"/g, "");

                const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: "application/pdf" })
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                    "download",
                    fileName || `reporte_${groupKey}.pdf`
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error al descargar el PDF:", error);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Profile
                </h2>
            }
        >
            <div className="max-w-2xl p-6 mx-auto my-8 bg-white rounded-md shadow-md">
                <h1 className="mb-4 text-2xl font-semibold text-center text-gray-700">
                    Subir Archivo CSV
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
                                accept=".csv"
                                className="hidden"
                                onChange={(e) => setCsvFile(e.target.files[0])}
                                required
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Procesar Archivo
                    </button>
                </form>

                {groups.length > 0 && (
                    <div>
                        <h2 className="mb-2 text-xl font-semibold text-gray-700">
                            Grupos Encontrados:
                        </h2>
                        <ul className="space-y-2">
                            {groups.map((groupKey) => (
                                <li
                                    key={groupKey}
                                    className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm"
                                >
                                    <span className="text-gray-800">
                                        Pega ticket {groupKey}
                                    </span>
                                    <button
                                        onClick={() => handleDownload(groupKey)}
                                        className="px-3 py-1 text-sm font-medium text-white transition duration-300 ease-in-out bg-green-500 rounded-md hover:bg-green-600"
                                    >
                                        Descargar PDF
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Files;
