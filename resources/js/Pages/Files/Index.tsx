import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import axios from "axios";

const Files = ({ auth }: PageProps) => {
    const { data, setData, post, progress } = useForm<{
        csv_file: File | undefined;
    }>({
        csv_file: undefined,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("csv_file", data.csv_file as File);

        axios
            .post("/files/upload", formData, {
                responseType: "blob",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                /*   const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: "application/pdf" })
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "pega_ticket.pdf");
                document.body.appendChild(link);
                link.click(); */

                const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: "application/zip" })
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "pega_tickets.zip");
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
            });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Profile
                </h2>
            }
        >
            <form onSubmit={submit}>
                <input
                    accept=".csv"
                    type="file"
                    onChange={(e) => {
                        if ((e.target?.files?.length ?? 0) > 0) {
                            const file = e.target.files?.[0];
                            console.log("file", file);
                            setData("csv_file", file);
                        }
                    }}
                />
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <button type="submit">Submit</button>
            </form>
        </AuthenticatedLayout>
    );
};

export default Files;
