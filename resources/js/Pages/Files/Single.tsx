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
            <h1>Subir Archivo CSV</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target?.files?.[0] || null)}
                    required
                />
                <button type="submit">Procesar Archivo</button>
            </form>

            {groups.length > 0 && (
                <div>
                    <h2>Grupos Encontrados:</h2>
                    <ul>
                        {groups.map((groupKey) => (
                            <li key={groupKey}>
                                {groupKey}{" "}
                                <button
                                    onClick={() => handleDownload(groupKey)}
                                >
                                    Descargar PDF
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Files;
