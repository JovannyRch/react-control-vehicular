import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Files = ({ auth }: PageProps) => {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [packageSize, setPackageSize] = useState(20);
    const [packages, setPackages] = useState([]);
    const [cacheKey, setCacheKey] = useState("");
    const [currentPackageLoadingId, setCurrentPackageLoadingId] = useState<
        null | string
    >(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!csvFile) return;

        const formData = new FormData();
        formData.append("csv_file", csvFile);
        formData.append("package_size", packageSize.toString());

        axios
            .post("/files/upload/package", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setPackages(response.data.packages);
                setCacheKey(response.data.cacheKey);
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
            });
    };

    const handleDownloadPackage = (packageId: string) => {
        setCurrentPackageLoadingId(packageId);
        axios
            .get(`/download-package/${cacheKey}/${packageId}`, {
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
                link.setAttribute(
                    "download",
                    fileName || `paquete_${packageId}.zip`
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error al descargar el paquete:", error);
            })
            .finally(() => {
                setCurrentPackageLoadingId(null);
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
                                onChange={(e) => {
                                    setCsvFile(e.target.files?.[0] || null);
                                    setPackages([]);
                                }}
                                required
                            />
                        </label>
                    </div>
                    {csvFile && (
                        <>
                            <h1 className="mt-4 mb-2 text-2xl font-bold text-gray-700">
                                {csvFile?.name}
                            </h1>
                            <div className="mt-4">
                                <label className="block mb-2 text-gray-700">
                                    Tamaño del paquete:
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={packageSize}
                                    onChange={(e) =>
                                        setPackageSize(Number(e.target.value))
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!csvFile}
                                className="w-full px-4 py-2 mt-4 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                            >
                                Procesar Archivo
                            </button>
                        </>
                    )}
                </form>
                <div>
                    {packages.length > 0 && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold text-gray-700">
                                Paquetes Disponibles:
                            </h2>
                            <ul className="space-y-2">
                                {packages.map((packageId, index) => (
                                    <li
                                        key={packageId}
                                        className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm"
                                    >
                                        <span className="text-gray-800">
                                            Paquete {index + 1}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleDownloadPackage(packageId)
                                            }
                                            disabled={
                                                currentPackageLoadingId ===
                                                packageId
                                            }
                                            className="px-3 py-1 text-sm font-medium text-white transition duration-300 ease-in-out bg-green-500 rounded-md hover:bg-green-600"
                                        >
                                            {currentPackageLoadingId ===
                                            packageId ? (
                                                <div className="flex gap-1 ">
                                                    <span>Descargando...</span>
                                                    <div className="flex items-center justify-center animate-spin">
                                                        <AiOutlineLoading3Quarters />
                                                    </div>
                                                </div>
                                            ) : (
                                                "Descargar ZIP"
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Files;
